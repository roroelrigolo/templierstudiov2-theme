import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, Button, ColorPalette, TextControl } from '@wordpress/components';
import { icons } from '../../assets/icons';
import { getColorsFromCSS } from '../../assets/colors';
import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

const colors = getColorsFromCSS();

registerBlockType('templierstudiov2-theme/icon', {
    title: 'Icon',
    category: 'custom-category',
    icon: 'star-filled',
    attributes: {
        icon: { type: 'string', default: icons[0].icon },
        styleIcon: { type: 'string', default: 'fa-solid' },
        size: { type: 'number', default: 30 },
        customSvg: { type: 'string', default: '' },
        textAlign: { type: 'string', default: 'center' },
        color: { type: 'string', default: colors[0].color },
        link: { type: 'string', default: '' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { icon, styleIcon, size, customSvg, textAlign, color, link } = attributes;

        const iconOptions = icons.map((icon) => ({
            label: icon.name,
            value: icon.icon,
        }));

        return (
            <div>
                <InspectorControls>
                    <PanelBody title="Icon">
                        <SelectControl 
                            label="Nom de l'icon" 
                            value={icon} 
                            options={iconOptions} 
                            onChange={(newIcon) => setAttributes({ icon: newIcon, customSvg: '' })} 
                        />
                        <SelectControl 
                            label="Style de l'icon" 
                            value={styleIcon} 
                            options={[
                                { label: 'Solid', value: 'fa-solid' },
                                { label: 'Regular', value: 'fa-regular' },
                                { label: 'Light', value: 'fa-light' },
                                { label: 'Thin', value: 'fa-thin' },
                            ]} 
                            onChange={(newStyleIcon) => setAttributes({ styleIcon: newStyleIcon })} 
                        />
                        <ColorPalette 
                            value={color} 
                            onChange={(newColor) => setAttributes({ color: newColor })} 
                            colors={colors} 
                        />
                        <RangeControl 
                            label="Taille" 
                            value={size} 
                            onChange={(newSize) => setAttributes({ size: newSize })} 
                            min={0} 
                            max={100} 
                        />
                        <SelectControl
                            label="Alignement du texte"
                            value={textAlign}
                            options={[
                                { label: 'Gauche', value: 'left' },
                                { label: 'Centre', value: 'center' },
                                { label: 'Droite', value: 'right' },
                            ]}
                            onChange={(newAlign) => setAttributes({ textAlign: newAlign })}
                        />
                        <TextControl 
                            label="Lien" 
                            value={link} 
                            onChange={(newLink) => setAttributes({ link: newLink })} 
                            placeholder="https://exemple.com" 
                        />
                        <MediaUploadCheck>
                            <MediaUpload
                                allowedTypes={["image/svg+xml"]}
                                onSelect={(media) => setAttributes({ customSvg: media.url, icon: '' })}
                                render={({ open }) => (
                                    <Button onClick={open} isPrimary>
                                        Importer un SVG
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                </InspectorControls>
                <div style={{ textAlign }}>
                    {customSvg ? (
                        link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <img src={customSvg} alt="Custom SVG" style={{ width: size, height: size }} />
                            </a>
                        ) : (
                            <img src={customSvg} alt="Custom SVG" style={{ width: size, height: size }} />
                        )
                    ) : (
                        link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <i className={`${styleIcon} ${icon}`} style={{ fontSize: size, color: color }}></i>
                            </a>
                        ) : (
                            <i className={`${styleIcon} ${icon}`} style={{ fontSize: size, color: color }}></i>
                        )
                    )}
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { icon, styleIcon, size, customSvg, textAlign, color, link } = attributes;

        return (
            <div style={{ textAlign }}>
                {customSvg ? (
                    link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <img src={customSvg} alt="Custom SVG" style={{ width: `${size}px`, height: `${size}px` }} />
                        </a>
                    ) : (
                        <img src={customSvg} alt="Custom SVG" style={{ width: `${size}px`, height: `${size}px` }} />
                    )
                ) : (
                    link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <i className={`${styleIcon} ${icon}`} style={{ fontSize: `${size}px`, color: color }}></i>
                        </a>
                    ) : (
                        <i className={`${styleIcon} ${icon}`} style={{ fontSize: `${size}px`, color: color }}></i>
                    )
                )}
            </div>
        );
    },
});
