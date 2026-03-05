import { registerBlockType } from '@wordpress/blocks';
import { RichText, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './style.css';

registerBlockType('templierstudiov2-theme/menu-item', {
    title: 'Menu Item',
    icon: 'admin-links',
    parent: ['templierstudiov2-theme/menu', 'templierstudiov2-theme/menu-item'],
    attributes: {
        label: { type: 'string', default: 'Lien' },
        url: { type: 'string', default: '#' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { label, url } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Paramètres du lien">
                        <TextControl
                            label="Label"
                            value={label}
                            onChange={(value) => setAttributes({ label: value })}
                        />
                        <TextControl
                            label="URL"
                            value={url}
                            onChange={(value) => setAttributes({ url: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="menu-item">
                    <a
                        href={url}
                        onClick={(e) => e.preventDefault()}
                    >
                        <RichText
                            value={label}
                            onChange={(value) => setAttributes({ label: value })}
                            placeholder="Nom du lien"
                        />
                    </a>
                    <div className="submenu">
                        <InnerBlocks allowedBlocks={['templierstudiov2-theme/menu-item']} />
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { label, url } = attributes;

        return (
            <div className="menu-item">
                <a href={url}>{label}</a>
                <div className="submenu">
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
