export function getColorsFromCSS() {
    const styles = getComputedStyle(document.documentElement);
    const colors = [];

    for (let i = 0; i < styles.length; i++) {
        const name = styles[i];
        if (name.startsWith('--color-')) {
            const slug = name.replace('--color-', '');
            const color = styles.getPropertyValue(name).trim();
            const formattedName = "Couleur " + slug.charAt(0) + slug.slice(1);
            colors.push({ name: formattedName, slug, color });
        }
    }

    // Tri personnalisé
    const priority = ['dark', 'light', 'gray'];
    colors.sort((a, b) => {
        const indexA = priority.indexOf(a.slug);
        const indexB = priority.indexOf(b.slug);

        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB; // les deux sont prioritaires, garde leur ordre
        } else if (indexA !== -1) {
            return -1; // a est prioritaire
        } else if (indexB !== -1) {
            return 1; // b est prioritaire
        } else {
            // sinon on trie alphabétiquement par slug
            return a.slug.localeCompare(b.slug);
        }
    });

    return colors;
}
