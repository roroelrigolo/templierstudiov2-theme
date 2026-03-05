export function getTextStyleClasses() {
    const styles = [];

    for (const sheet of document.styleSheets) {
        try {
            for (const rule of sheet.cssRules) {
                if (rule.selectorText && rule.selectorText.startsWith('.txt-style-')) {

                    const slug = rule.selectorText.replace('.txt-style-', '');

                    const name = slug
                        .split('-')
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ');

                    styles.push({ slug, name });
                }
            }
        } catch (e) {
            
        }
    }

    styles.sort((a, b) => a.name.localeCompare(b.name));

    return styles;
}

export const getFontFamiliesFromCSS = () => {
    const styles = Array.from(document.styleSheets);
    const fonts = [];

    styles.forEach((sheet) => {
        try {
            if (!sheet.href || !sheet.href.includes('setup.css')) return;

            const rules = Array.from(sheet.cssRules);

            rules.forEach((rule) => {
                if (rule.selectorText === ':root') {
                    Array.from(rule.style).forEach((prop) => {
                        if (!prop.startsWith('--font-')) return;

                        const value = rule.style.getPropertyValue(prop).trim();

                        const match = value.match(/['"]([^'"]+)['"]/);

                        const label = match
                            ? match[1]
                            : prop.replace('--font-', '').replace(/-/g, ' ');

                        fonts.push({
                            label,
                            value: `var(${prop})`,
                        });
                    });
                }
            });
        } catch (e) {
        }
    });

    return fonts;
};
