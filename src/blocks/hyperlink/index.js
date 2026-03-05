import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks, URLInput } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import './style.css';

registerBlockType('templierstudiov2-theme/hyperlink', {
    title: 'Hyperlink',
    icon: 'admin-links',
    category: 'custom-category',
    attributes: {
        url: { type: 'string', default: '' },
        openInNewTab: { type: 'boolean', default: false },
    },
    edit: ({ attributes, setAttributes }) => {
        const { url, openInNewTab } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Paramètres du lien">
                        <URLInput
                            label="Lien"
                            value={url}
                            onChange={(newUrl) => setAttributes({ url: newUrl })}
                        />
                        <ToggleControl
                            label="Ouvrir dans un nouvel onglet"
                            checked={openInNewTab}
                            onChange={(newValue) => setAttributes({ openInNewTab: newValue })}
                        />
                    </PanelBody>
                </InspectorControls>

                <a 
                    href={url || '#'} 
                    target={openInNewTab ? '_blank' : undefined} 
                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                    className="block-hyperlink"
                    onClick={(e) => e.preventDefault()}
                >
                    <InnerBlocks />
                </a>
            </>
        );
    },
    save: ({ attributes }) => {
        const { url, openInNewTab } = attributes;

        return (
            <a 
                href={url || '#'} 
                target={openInNewTab ? '_blank' : undefined} 
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                className="block-hyperlink"
            >
                <InnerBlocks.Content />
            </a>
        );
    },
});
