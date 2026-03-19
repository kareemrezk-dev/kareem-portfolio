'use client'
import { useState, useEffect } from 'react'

const translations = {
  en: {
    content: 'Content',
    projects: 'Projects',
    site: 'Site',
    viewPortfolio: 'View Portfolio',
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    signOut: 'Sign Out',
    
    manageProjects: 'Manage your portfolio projects',
    newProjectBtn: '+ New Project',
    totalProjects: 'Total Projects',
    featured: 'Featured',
    regular: 'Regular',
    noProjects: 'No projects yet.',
    addFirstProject: 'Add Your First Project',
    title: 'Title',
    slug: 'Slug',
    tags: 'Tags',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    
    newProject: 'New Project',
    addNewProject: 'Add a new project to your portfolio',
    editProject: 'Edit Project',
    
    titleLabel: 'Title *',
    slugLabel: 'Slug *',
    urlHint: 'URL: /work/',
    descLabel: 'Description',
    descPlaceholder: 'Describe the project, the problem it solves, and your approach...',
    roleLabel: 'Role',
    rolePlaceholder: 'UI/UX Designer & Front-End Developer',
    roleColor: 'Role Color',
    yearLabel: 'Year',
    tagsLabel: 'Tags',
    tagsHint: '(comma separated)',
    liveUrl: 'Live URL',
    githubUrl: 'GitHub URL',
    coverImage: 'Cover Image',
    removeBtn: 'Remove',
    clickUpload: 'Click to upload cover image',
    galleryImages: 'Gallery Images',
    clickUploadGallery: 'Click to upload multiple images',
    uploadingGallery: 'Uploading...',
    orPasteLink: 'Or paste a link:',
    addLinkBtn: 'Add',
    orderIndex: 'Order Index',
    lowerFirst: 'Lower = appears first',
    featuredLabel: 'Featured',
    no: 'No',
    yesFeatured: 'Yes — show on homepage',
    saving: 'Saving...',
    saveProject: 'Save Project',
    cancel: 'Cancel',
    successMsg: 'Project saved successfully!',
    errorMsg: 'Something went wrong',
    uploadFailed: 'Image upload failed'
  },
  ar: {
    content: 'المحتوى',
    projects: 'المشاريع',
    site: 'الموقع',
    viewPortfolio: 'عرض المعرض',
    settings: 'الإعدادات',
    theme: 'المظهر',
    language: 'اللغة',
    signOut: 'تسجيل خروج',

    manageProjects: 'إدارة مشاريع معرض أعمالك',
    newProjectBtn: '+ مشروع جديد',
    totalProjects: 'كل المشاريع',
    featured: 'المميزة',
    regular: 'العادية',
    noProjects: 'لا توجد مشاريع مضافة.',
    addFirstProject: 'أضف مشروعك الأول',
    title: 'العنوان',
    slug: 'الرابط (Slug)',
    tags: 'الوسوم',
    actions: 'الإجراءات',
    edit: 'تعديل',
    delete: 'حذف',

    newProject: 'مشروع جديد',
    addNewProject: 'إضافة مشروع جديد لمعرض أعمالك',
    editProject: 'تعديل المشروع',

    titleLabel: '* العنوان',
    slugLabel: '* الرابط (Slug)',
    urlHint: 'الرابط: /work/',
    descLabel: 'الوصف',
    descPlaceholder: 'صف المشروع، المشكلة التي يحلها، وطريقتك في الحل...',
    roleLabel: 'الدور',
    rolePlaceholder: 'مصمم واجهات ومطور واجهات أمامية',
    roleColor: 'لون الـ Role',
    yearLabel: 'السنة',
    tagsLabel: 'الوسوم',
    tagsHint: '(مفصولة بفاصلة)',
    liveUrl: 'رابط العرض المباشر',
    githubUrl: 'رابط جيت هاب',
    coverImage: 'صورة الغلاف',
    removeBtn: 'إزالة',
    clickUpload: 'اضغط لرفع صورة الغلاف',
    galleryImages: 'صور المعرض (Gallery)',
    clickUploadGallery: 'اضغط لرفع عدة صور',
    uploadingGallery: 'جاري الرفع...',
    orPasteLink: 'أو أضف رابط الصورة المباشر:',
    addLinkBtn: 'إضافة',
    orderIndex: 'ترتيب العرض',
    lowerFirst: 'الرقم الأقل يظهر أولاً',
    featuredLabel: 'مميز؟',
    no: 'لا',
    yesFeatured: 'نعم — اعرضه في الرئيسية',
    saving: 'جاري الحفظ...',
    saveProject: 'حفظ المشروع',
    cancel: 'إلغاء',
    successMsg: 'تم حفظ المشروع بنجاح!',
    errorMsg: 'حدث خطأ ما',
    uploadFailed: 'فشل في رفع الصورة'
  }
}

export function useAdminLang() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    // Initial check
    const currentLang = document.documentElement.getAttribute('lang') || 'en'
    setLang(['en', 'ar'].includes(currentLang) ? currentLang : 'en')

    // Observe changes to 'lang' attribute on HTML tag triggered by the Sidebar buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'lang') {
          const newLang = document.documentElement.getAttribute('lang')
          setLang(['en', 'ar'].includes(newLang) ? newLang : 'en')
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    
    return () => observer.disconnect()
  }, [])

  return { lang, t: translations[lang] }
}
