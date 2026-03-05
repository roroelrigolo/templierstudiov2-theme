import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import './style.css';

registerBlockType('templierstudiov2-theme/menu', {
    title: 'Menu',
    icon: 'menu',
    category: 'custom-category',
    attributes: {
        direction: {
            type: 'string',
            default: 'row',
        },
        gap: {
            type: 'number',
            default: 10,
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { direction, gap } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Disposition du menu" initialOpen={true}>
                        <SelectControl
                            label="Direction"
                            value={direction}
                            options={[
                                { label: 'En ligne', value: 'row' },
                                { label: 'En colonne', value: 'column' },
                            ]}
                            onChange={(value) => setAttributes({ direction: value })}
                        />
                        <RangeControl
                            label="Espacement (px)"
                            value={gap}
                            onChange={(value) => setAttributes({ gap: value })}
                            min={0}
                            max={100}
                        />
                    </PanelBody>
                </InspectorControls>

                <nav
                    className={`menu menu-${direction}`}
                    style={{ display: 'flex', flexDirection: direction, gap: `${gap}px` }}
                >
                    <InnerBlocks
                        allowedBlocks={['templierstudiov2-theme/menu-item']}
                        templateLock={false}
                    />
                </nav>
            </>
        );
    },
    save: ({ attributes }) => {
        const { direction, gap } = attributes;
        return (
            <nav
                className={`menu menu-${direction}`}
                style={{ display: 'flex', flexDirection: direction, gap: `${gap}px` }}
            >
                <InnerBlocks.Content />
            </nav>
        );
    },
});

