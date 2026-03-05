export const registerCustomCategory = () => {
    const categories = wp.blocks.getCategories();
    const categoryExists = categories.some(category => category.slug === 'custom-category');

    if (!categoryExists) {
        wp.blocks.setCategories([
            {
                slug: 'custom-category',
                title: 'Blocs personnalisés',
            },
            ...categories,
        ]);
    }
};