import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, SelectControl, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import { getColorsFromCSS } from '../../assets/colors';
import { getTextStyleClasses, getFontFamiliesFromCSS } from '../../assets/text';

import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

const colors = getColorsFromCSS();

const textStyleOptions = getTextStyleClasses().map(s => ({
    label: s.name,
    value: s.slug,
}));

const getCustomStyle = (attrs) => {
    if (attrs.styleType !== 'custom') return {};

    return {
        fontFamily: attrs.fontFamily || undefined,
        fontSize: attrs.fontSize ? `${attrs.fontSize}rem` : undefined,
        lineHeight: attrs.lineHeight || undefined,
        fontWeight: attrs.fontWeight || undefined,
        textTransform: attrs.textTransform || undefined,
        letterSpacing: attrs.letterSpacing !== undefined
            ? `${attrs.letterSpacing}px`
            : undefined,
    };
};

registerBlockType('templierstudiov2-theme/text', {
    title: 'Texte',
    category: 'custom-category',
    icon: 'editor-textcolor',

    attributes: {
        title: { type: 'string' },

        balise: { type: 'string', default: 'p' },
        color: { type: 'string', default: colors[0]?.color },
        alignement: { type: 'string', default: 'start' },

        styleType: { type: 'string', default: 'preset' },
        style: { type: 'string', default: 'p' },

        fontFamily: { type: 'string' },
        fontSize: { type: 'number', default: 1 },
        lineHeight: { type: 'number', default: 1 },
        fontWeight: { type: 'number', default: 400 },
        textTransform: { type: 'string' },
        letterSpacing: { type: 'number' },
    },

    edit: ({ attributes, setAttributes }) => {
        const {
            title,
            balise,
            color,
            alignement,
            styleType,
            style,
            fontFamily,
            fontSize,
            lineHeight,
            fontWeight,
            textTransform,
            letterSpacing,
        } = attributes;

        const customStyle = getCustomStyle(attributes);
        const fontFamilyOptions = getFontFamiliesFromCSS();

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Réglages du texte" initialOpen>
                        <ColorPalette
                            value={color}
                            onChange={(value) => setAttributes({ color: value })}
                            colors={colors}
                        />

                        <SelectControl
                            label="Balise SEO"
                            value={balise}
                            options={[
                                { label: 'H1', value: 'h1' },
                                { label: 'H2', value: 'h2' },
                                { label: 'H3', value: 'h3' },
                                { label: 'H4', value: 'h4' },
                                { label: 'H5', value: 'h5' },
                                { label: 'p', value: 'p' },
                            ]}
                            onChange={(value) => setAttributes({ balise: value })}
                        />

                        <SelectControl
                            label="Alignement"
                            value={alignement}
                            options={[
                                { label: 'Gauche', value: 'start' },
                                { label: 'Centre', value: 'center' },
                                { label: 'Droite', value: 'end' },
                            ]}
                            onChange={(value) => setAttributes({ alignement: value })}
                        />

                        <SelectControl
                            label="Type de style"
                            value={styleType}
                            options={[
                                { label: 'Style prédéfini', value: 'preset' },
                                { label: 'Style personnalisé', value: 'custom' },
                            ]}
                            onChange={(value) => setAttributes({ styleType: value })}
                        />

                        {styleType === 'preset' && (
                            <SelectControl
                                label="Style"
                                value={style}
                                options={textStyleOptions}
                                onChange={(value) => setAttributes({ style: value })}
                            />
                        )}
                    </PanelBody>


                    {styleType === 'custom' && (
                        <>
                            <PanelBody title="Style personnalisé" initialOpen>
                                <SelectControl
                                    label="Police"
                                    value={fontFamily}
                                    options={[
                                        { label: 'Par défaut', value: '' },
                                        ...fontFamilyOptions,
                                    ]}
                                    onChange={(value) => setAttributes({ fontFamily: value })}
                                />
                                <RangeControl
                                    label="Taille de police (rem)"
                                    value={fontSize}
                                    min={0}
                                    max={20}
                                    step={0.01}
                                    onChange={(value) => setAttributes({ fontSize: value })}
                                />

                                <RangeControl
                                    label="Hauteur de ligne"
                                    value={lineHeight}
                                    min={0.1}
                                    max={3}
                                    step={0.1}
                                    onChange={(value) => setAttributes({ lineHeight: value })}
                                />

                                <SelectControl
                                    label="Graisse"
                                    value={fontWeight}
                                    options={[
                                        { label: 'Thin', value: 100 },
                                        { label: 'Extra light', value: 200 },
                                        { label: 'Light', value: 300 },
                                        { label: 'Normal', value: 400 },
                                        { label: 'Medium', value: 500 },
                                        { label: 'Bold', value: 700 },
                                        { label: 'Extra bold', value: 800 },
                                        { label: 'Black', value: 900 },
                                    ]}
                                    onChange={(value) =>
                                        setAttributes({ fontWeight: Number(value) })
                                    }
                                />

                                <SelectControl
                                    label="Transformation du texte"
                                    value={textTransform}
                                    options={[
                                        { label: 'Aucune', value: 'none' },
                                        { label: 'Majuscules', value: 'uppercase' },
                                        { label: 'Minuscules', value: 'lowercase' },
                                        { label: 'Capitales', value: 'capitalize' },
                                    ]}
                                    onChange={(value) =>
                                        setAttributes({ textTransform: value })
                                    }
                                />

                                <RangeControl
                                    label="Espacement des lettres (px)"
                                    value={letterSpacing}
                                    min={-1}
                                    max={10}
                                    step={0.1}
                                    onChange={(value) =>
                                        setAttributes({ letterSpacing: value })
                                    }
                                />
                            </PanelBody>
                        </>
                    )}
                </InspectorControls>

                <div className="text-block">
                    <RichText
                        tagName={balise}
                        value={title}
                        placeholder="Écris quelque chose…"
                        onChange={(value) => setAttributes({ title: value })}
                        className={
                            styleType === 'preset'
                                ? `txt-style-${style}`
                                : ''
                        }
                        style={{
                            color,
                            textAlign: alignement,
                            ...customStyle,
                        }}
                    />
                </div>
            </Fragment >
        );
    },

    save: ({ attributes }) => {
        const {
            title,
            balise,
            color,
            alignement,
            styleType,
            style,
        } = attributes;

        const customStyle = getCustomStyle(attributes);

        return (
            <div className="text-block">
                <RichText.Content
                    tagName={balise}
                    value={title}
                    className={
                        styleType === 'preset'
                            ? `txt-style-${style}`
                            : ''
                    }
                    style={{
                        color,
                        textAlign: alignement,
                        ...customStyle,
                    }}
                />
            </div>
        );
    },
});
