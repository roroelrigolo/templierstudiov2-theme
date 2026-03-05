import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import './style.css';

registerBlockType('templierstudiov2-theme/model', {
    title: 'Model',
    category: 'custom-category',
    icon: 'admin-post',
    attributes: {
        selectedModel: { type: 'string', default: '' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { selectedModel } = attributes;
        const [models, setModels] = useState([]);

        const posts = useSelect((select) => {
            return select('core').getEntityRecords('postType', 'model', { per_page: -1 });
        }, []);

        if (posts && posts.length > 0 && models.length === 0) {
            setModels(posts.map((post) => ({ label: post.title.rendered, value: post.id })));
        }

        const selectedPost = posts?.find(post => post.id == selectedModel);

        return (
            <div {...useBlockProps()}>
                <InspectorControls>
                    <PanelBody title="Sélection du modèle">
                        <SelectControl
                            label="Choisir un modèle"
                            value={selectedModel}
                            options={[{ label: 'Sélectionner...', value: '' }, ...models]}
                            onChange={(newModel) => setAttributes({ selectedModel: newModel })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div>
                    {selectedModel && selectedPost ? (
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }} />
                        </div>
                    ) : (
                        <p>Aucun modèle sélectionné.</p>
                    )}
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        return <div data-model-id={attributes.selectedModel}></div>;
    },
});
