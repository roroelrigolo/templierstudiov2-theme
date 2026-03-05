import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { chevronDown, chevronUp } from '@wordpress/icons';
import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

registerBlockType('templierstudiov2-theme/accordion', {
    title: 'Accordéon',
    category: 'custom-category',
    icon: 'menu',
    attributes: {
        question: {
            type: 'string',
            source: 'html',
            selector: '.accordion-question h3',
        },
        answer: {
            type: 'string',
            source: 'html',
            selector: '.accordion-answer p',
        },
        isOpen: {
            type: 'boolean',
            default: false,
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const { question, answer, isOpen } = attributes;
        const [open, setOpen] = useState(isOpen);

        return (
            <div className="accordion-block">
                <InspectorControls>
                    <PanelBody title="Options">
                        <ToggleControl
                            label="Ouvrir par défaut"
                            checked={isOpen}
                            onChange={(value) => setAttributes({ isOpen: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={`accordion-item ${open ? 'open' : ''}`}>
                    <div 
                        className="accordion-question" 
                        onClick={() => setOpen(!open)}
                    >
                        <RichText
                            tagName="h3"
                            placeholder="Saisissez la question..."
                            value={question}
                            onChange={(newQuestion) => setAttributes({ question: newQuestion })}
                            allowedFormats={[ 'core/bold', 'core/italic', 'core/link' ]}
                        />
                        <span className="accordion-icon">{open ? chevronUp : chevronDown}</span>
                    </div>
                    {open && (
                        <div className="accordion-answer">
                            <RichText
                                tagName="p"
                                placeholder="Saisissez la réponse..."
                                value={answer}
                                onChange={(newAnswer) => setAttributes({ answer: newAnswer })}
                                allowedFormats={[ 'core/bold', 'core/italic', 'core/link' ]}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { question, answer, isOpen } = attributes;
        return (
            <div className="accordion-block">
                <div className={`accordion-item ${isOpen ? 'open' : ''}`}> 
                    <div className="accordion-question" onClick="this.nextElementSibling.classList.toggle('open'); this.querySelector('.accordion-icon').classList.toggle('rotated');">
                        <h3><RichText.Content value={question} /></h3>
                        <span className="accordion-icon">▼</span>
                    </div>
                    <div className="accordion-answer" style={{ display: isOpen ? 'block' : 'none' }}>
                        <p><RichText.Content value={answer} /></p>
                    </div>
                </div>
            </div>
        );
    }    
});