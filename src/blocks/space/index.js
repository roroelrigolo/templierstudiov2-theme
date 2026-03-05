import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, ColorPalette, RangeControl } from '@wordpress/components';
import { spaces } from '../../assets/spaces';
import { getColorsFromCSS } from '../../assets/colors';
import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

const colors = getColorsFromCSS();

registerBlockType('templierstudiov2-theme/space', {
    title: 'Espacement',
    category: 'custom-category',
    icon: 'editor-break',
    attributes: {
        space: {
            type: 'string',
            default: spaces[0].space,
        },
        isSeparator: {
            type: 'boolean',
            default: false,
        },
        separatorSpaceBefore: {
            type: 'string',
            default: spaces[0].space,
        },
        separatorSpaceAfter: {
            type: 'string',
            default: spaces[0].space,
        },
        borderColor: {
            type: 'string',
            default: colors[(colors.length - 1)].color,
        },
        borderWidth: {
            type: 'number',
            default: 1,
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { space, isSeparator, separatorSpaceBefore, separatorSpaceAfter, borderColor, borderWidth } = attributes;

        const spaceOptions = spaces.map((space) => ({
            label: space.name,
            value: space.space,
        }));

        return (
            <div>
                <InspectorControls>
                    <PanelBody title="Options de l'espacement">
                        <ToggleControl
                            label="Utiliser un séparateur"
                            checked={isSeparator}
                            onChange={() => setAttributes({ isSeparator: !isSeparator })}
                        />
                        {!isSeparator ? (
                            <SelectControl
                                label="Valeur de l'espacement"
                                value={space}
                                options={spaceOptions}
                                onChange={(newSpace) => setAttributes({ space: newSpace })}
                            />
                        ) : (
                            <>
                                <SelectControl
                                    label="Espace avant le séparateur"
                                    value={separatorSpaceBefore}
                                    options={spaceOptions}
                                    onChange={(newSpace) => setAttributes({ separatorSpaceBefore: newSpace })}
                                />
                                <SelectControl
                                    label="Espace après le séparateur"
                                    value={separatorSpaceAfter}
                                    options={spaceOptions}
                                    onChange={(newSpace) => setAttributes({ separatorSpaceAfter: newSpace })}
                                />
                                <ColorPalette
                                    label="Couleur de la bordure"
                                    value={borderColor}
                                    onChange={(newBorderColor) => setAttributes({ borderColor: newBorderColor })}
                                    colors={colors}
                                />
                                <RangeControl
                                    label="Taille de la bordure (px)"
                                    value={borderWidth}
                                    onChange={(newWidth) => setAttributes({ borderWidth: newWidth })}
                                    min={1}
                                    max={10}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
                {!isSeparator ? (
                    <div className={`space-block w-100 space-${space}`}></div>
                ) : (
                    <div
                        className={`separator-block w-100 space-${separatorSpaceBefore} space-after-${separatorSpaceAfter}`}
                        style={{ borderBottomColor: borderColor, borderBottomWidth: borderWidth + 'px', borderBottomStyle: 'solid' }}
                    ></div>
                )}
            </div>
        );
    },
    save: ({ attributes }) => {
        const { space, isSeparator, separatorSpaceBefore, separatorSpaceAfter, borderColor, borderWidth } = attributes;

        return !isSeparator ? (
            <div className={`space-block w-100 space-${space}`}></div>
        ) : (
            <div
                className={`separator-block w-100 space-${separatorSpaceBefore} space-after-${separatorSpaceAfter}`}
                style={{ borderBottomColor: borderColor, borderBottomWidth: borderWidth + 'px', borderBottomStyle: 'solid' }}
            ></div>
        );
    },
});