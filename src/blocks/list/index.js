import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPalette } from '@wordpress/components';
import { getColorsFromCSS } from '../../assets/colors';
import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

const colors = getColorsFromCSS();

registerBlockType('templierstudiov2-theme/list', {
    title: 'Liste',
    category: 'custom-category',
    icon: 'editor-ul',
    attributes: {
        items: {
            type: 'array',
            default: []
        },
        color: {
            type: 'string',
            default: colors[0].color,
        },
        alignement: {
            type: 'string',
            default: 'start',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { items, color, alignement } = attributes;

        const updateItem = (newText, index) => {
            const newItems = items.map((item, i) =>
                i === index ? { ...item, text: newText } : item
            );
            setAttributes({ items: newItems });
        };

        const addItem = () => {
            setAttributes({ items: [...items, { text: 'Nouvel élément' }] });
        };

        const removeItem = (index) => {
            const newItems = items.filter((_, i) => i !== index);
            setAttributes({ items: newItems });
        };

        return (
            <div>
                <InspectorControls>
                    <PanelBody title="Options de liste">
                        <ColorPalette
                            value={color}
                            onChange={(newColor) => setAttributes({ color: newColor })}
                            colors={colors}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="list-block">
                    <ul
                        className={'txt-style-p'}
                        style={{
                            color,
                            textAlign: alignement,
                        }}>
                        {items.map((item, index) => (
                            <li key={index}>
                                <RichText
                                    tagName="span"
                                    value={item.text}
                                    onChange={(newText) => updateItem(newText, index)}
                                    placeholder="Écris un élément..."
                                />
                                <Button onClick={() => removeItem(index)} isDestructive>
                                    Supprimer
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={addItem} variant="primary">Ajouter un élément</Button>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { items, color, alignement } = attributes;

        return (
            <div className="list-block">
                <ul
                    className={'txt-style-p'}
                    style={{
                        color,
                        textAlign: alignement,
                    }}>
                    {items.map((item, index) => (
                        <li key={index}>
                            <RichText.Content tagName="span" value={item.text} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
});