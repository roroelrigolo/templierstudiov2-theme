import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, URLInputButton } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, TextControl, CheckboxControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

registerBlockType('templierstudiov2-theme/button', {
    title: 'Bouton',
    category: 'custom-category',
    icon: 'button',
    attributes: {
        buttonStyle: {
            type: 'string',
            default: 'btn-1',
        },
        buttonSize: {
            type: 'string',
            default: 'fit-content',
        },
        isBig: {
            type: 'boolean',
            default: false,
        },
        buttonText: {
            type: 'string',
            default: 'Cliquez ici',
        },
        arrowInBtn: {
            type: 'boolean',
            default: false,
        },
        buttonUrl: {
            type: 'string',
            default: '',
        },
        alignement: {
            type: 'string',
            default: 'start',
        },
        buttonNewTab: {
            type: 'boolean',
            default: false,
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { buttonStyle, buttonSize, isBig, buttonText, arrowInBtn, buttonUrl, alignement, buttonNewTab } = attributes;

        return (
            <div>
                <InspectorControls>
                    <PanelBody title="Options du bouton">
                        <SelectControl
                            label="Style"
                            value={buttonStyle}
                            options={[
                                { label: 'Style 1', value: 'btn-1' },
                                { label: 'Style 2', value: 'btn-2' },
                                { label: 'Style 3', value: 'btn-3' },
                                { label: 'Style 4', value: 'btn-4' },
                                { label: 'Style 5', value: 'btn-5' },
                            ]}
                            onChange={(newButtonStyle) => setAttributes({ buttonStyle: newButtonStyle })}
                        />
                        <SelectControl
                            label="Taille"
                            value={buttonSize}
                            options={[
                                { label: 'Fit', value: 'fit-content' },
                                { label: 'Full', value: '100%' },
                            ]}
                            onChange={(newButtonSize) => setAttributes({ buttonSize: newButtonSize })}
                        />
                        <CheckboxControl
                            label="Gros bouton ?"
                            checked={isBig}
                            onChange={(isChecked) => setAttributes({ isBig: isChecked })}
                        />
                        <TextControl
                            label="Texte du bouton"
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                        />
                        <CheckboxControl
                            label="Flèche dans le bouton ?"
                            checked={arrowInBtn}
                            onChange={(isChecked) => setAttributes({ arrowInBtn: isChecked })}
                        />
                        <URLInputButton
                            label="URL du bouton"
                            url={buttonUrl}
                            onChange={(value) => setAttributes({ buttonUrl: value })}
                        />
                        <SelectControl
                            label="Alignement"
                            value={alignement}
                            options={[
                                { label: 'Gauche', value: 'start' },
                                { label: 'Milieu', value: 'center' },
                                { label: 'Droite', value: 'end' },
                            ]}
                            onChange={(newAlignement) => setAttributes({ alignement: newAlignement })}
                        />
                        <CheckboxControl
                            label="Ouvrir dans un nouvel onglet"
                            checked={buttonNewTab}
                            onChange={(isChecked) => setAttributes({ buttonNewTab: isChecked })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="btn-block">
                    <div style={{ textAlign: alignement }}>
                        <Fragment>
                            <Button
                                href={buttonUrl}
                                className={`${buttonStyle} ${isBig ? 'big-btn' : ''}`}
                                style={{ width: `${buttonSize}` }}
                                target={buttonNewTab ? '_blank' : undefined}
                                onClick={(e) => e.preventDefault()}
                            >
                                {buttonText} {arrowInBtn && <i className="fa-solid fa-arrow-right"></i>}
                            </Button>
                        </Fragment>
                    </div>
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { buttonStyle, buttonSize, isBig, buttonText, arrowInBtn, buttonUrl, alignement, buttonNewTab } = attributes;

        return (
            <div className="btn-block">
                <div style={{ textAlign: alignement }}>
                    <a
                        href={buttonUrl}
                        className={`${buttonStyle} ${isBig ? 'big-btn' : ''}`}
                        style={{ width: `${buttonSize}` }}
                        target={buttonNewTab ? '_blank' : undefined}
                        rel={buttonNewTab ? 'noopener noreferrer' : undefined}
                    >
                        {buttonText} {arrowInBtn && <i className="fa-solid fa-arrow-right"></i>}
                    </a>
                </div>
            </div>
        );
    },
});
