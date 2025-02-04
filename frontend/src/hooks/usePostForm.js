import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { CATEGORIES, CONDITIONS } from "../utils/postForm";
import { toast } from 'react-toastify';

export const usePostForm = (user, initialPost = null) => {
  const initialState = {
    title: "",
    description: "",
    category: "Other",
    condition: "Good",
    location: "",
    pickupDetails: "",
    images: [],
    tags: [],
    contactPreference: "Both",
    availabilitySchedule: "",
    termsAccepted: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialPost) {
      setIsEditing(true);
      // Pre-fill form data when editing
      const fetchPostDetails = async () => {
        try {
          // Fetch post images
          const { data: images } = await supabase
            .from('post_images')
            .select('image_url')
            .eq('post_id', initialPost.id);

          // Fetch post tags
          const { data: postTags } = await supabase
            .from('post_tags')
            .select('tags(name)')
            .eq('post_id', initialPost.id);

          setFormData({
            title: initialPost.title,
            description: initialPost.description,
            category: initialPost.category,
            condition: initialPost.condition,
            location: initialPost.location,
            pickupDetails: initialPost.pickup_details,
            images: images?.map(img => img.image_url) || [],
            tags: postTags?.map(tag => tag.tags.name) || [],
            contactPreference: initialPost.contact_preference,
            availabilitySchedule: initialPost.availability_schedule,
            termsAccepted: initialPost.terms_accepted,
          });
        } catch (error) {
          toast.error("Error al cargar los detalles de la publicación");
        }
      };

      fetchPostDetails();
    }
  }, [initialPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5),
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTag = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (formData.tags.length < 5) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()],
        }));
        setCurrentTag("");
        if (errors.tags) {
          setErrors((prev) => ({ ...prev, tags: "" }));
        }
      }
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "El título es obligatorio";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria";
    if (!formData.pickupDetails.trim()) newErrors.pickupDetails = "Los detalles de recojo son obligatorios";
    if (!formData.availabilitySchedule.trim()) newErrors.availabilitySchedule = "El horario de disponibilidad es obligatorio";
    if (!formData.termsAccepted) newErrors.termsAccepted = "Debes aceptar los términos";
    if (formData.images.length === 0) newErrors.images = "Se requiere al menos una imagen";
    if (!CATEGORIES.includes(formData.category)) newErrors.category = "Categoría inválida";
    if (!CONDITIONS.includes(formData.condition)) newErrors.condition = "Estado inválido";
    if (formData.tags.length === 0) newErrors.tags = "Se requiere al menos una etiqueta";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      toast.error("Por favor, completa todos los campos requeridos");
      return false;
    }

    setIsSubmitting(true);
    try {
      let postId;
      if (isEditing) {
        // Update existing post
        const { data: updatedPost, error: updateError } = await supabase
          .from("posts")
          .update({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            condition: formData.condition,
            location: formData.location,
            pickup_details: formData.pickupDetails,
            contact_preference: formData.contactPreference,
            availability_schedule: formData.availabilitySchedule,
            terms_accepted: formData.termsAccepted,
          })
          .eq('id', initialPost.id)
          .select()
          .single();

        if (updateError) {
          toast.error("Error al actualizar la publicación: " + updateError.message);
          return false;
        }

        postId = initialPost.id;

        // Delete existing images and tags
        await supabase.from('post_images').delete().eq('post_id', postId);
        await supabase.from('post_tags').delete().eq('post_id', postId);
      } else {
        // Create new post
        const { data: post, error: postError } = await supabase
          .from("posts")
          .insert([
            {
              title: formData.title,
              description: formData.description,
              category: formData.category,
              condition: formData.condition,
              location: formData.location,
              pickup_details: formData.pickupDetails,
              contact_preference: formData.contactPreference,
              availability_schedule: formData.availabilitySchedule,
              terms_accepted: formData.termsAccepted,
              user_id: user?.id,
            },
          ])
          .select()
          .single();

        if (postError) {
          toast.error("Error al crear la publicación: " + postError.message);
          return false;
        }

        postId = post.id;
      }

      // Mostrar toast de progreso para las imágenes
      const imageToastId = toast.loading("Subiendo imágenes...");
      await handleImageUploadToSupabase(postId);
      toast.update(imageToastId, { 
        render: "Imágenes subidas correctamente", 
        type: "success", 
        isLoading: false,
        autoClose: 3000
      });

      // Mostrar toast de progreso para los tags
      const tagToastId = toast.loading("Guardando etiquetas...");
      await handleTagsUpload(postId);
      toast.update(tagToastId, { 
        render: "Etiquetas guardadas correctamente", 
        type: "success", 
        isLoading: false,
        autoClose: 3000
      });

      toast.success(isEditing ? "¡Publicación actualizada exitosamente!" : "¡Publicación creada exitosamente!", {
        autoClose: 3000
      });
      return true;
    } catch (error) {
      toast.error("Error al procesar la publicación: " + error.message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUploadToSupabase = async (postId) => {
    if (formData.images.length > 0) {
      const imageRecords = formData.images.map((imageUrl) => ({
        post_id: postId,
        image_url: imageUrl,
      }));

      const { error: imagesError } = await supabase
        .from("post_images")
        .insert(imageRecords);

      if (imagesError) {
        throw new Error("Error al insertar las imágenes: " + imagesError.message);
      }
    }
  };

  const handleTagsUpload = async (postId) => {
    if (formData.tags.length > 0) {
      for (const tagName of formData.tags) {
        const { data: existingTag } = await supabase
          .from('tags')
          .select()
          .eq('name', tagName)
          .single();

        let tagId;
        
        if (!existingTag) {
          const { data: newTag, error: insertError } = await supabase
            .from('tags')
            .insert([{ name: tagName }])
            .select()
            .single();

          if (insertError) {
            throw new Error("Error al insertar el tag: " + insertError.message);
          }
          
          tagId = newTag.id;
        } else {
          tagId = existingTag.id;
        }

        const { error: postTagError } = await supabase
          .from('post_tags')
          .insert([{
            post_id: postId,
            tag_id: tagId
          }]);

        if (postTagError) {
          throw new Error("Error al relacionar tag con el post: " + postTagError.message);
        }
      }
    }
  };

  return {
    formData,
    currentTag,
    errors,
    isSubmitting,
    isEditing,
    handleChange,
    handleImageUpload,
    removeImage,
    addTag,
    removeTag,
    setCurrentTag,
    submitForm,
    setFormData
  };
};
