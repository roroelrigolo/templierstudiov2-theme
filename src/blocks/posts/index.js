import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

registerBlockType('templierstudiov2-theme/posts', {
    title: 'Posts',
    category: 'custom-category',
    icon: 'index-card',
    attributes: {
        type: { type: 'string', default: 'post' },
        style: { type: 'string', default: 'style1' },
        quantity: { type: 'number', default: '3' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { type, style, quantity } = attributes;

        // Récupération des derniers posts
        const posts = useSelect((select) => {
            return select('core').getEntityRecords('postType', type, { per_page: quantity });
        }, [type, quantity]);

        return (
            <div>
                <InspectorControls>
                    <PanelBody title="Options de posts">
                        <SelectControl 
                            label="Type de post" 
                            value={type} 
                            options={[
                                { label: 'Actualités', value: 'post' },
                            ]} 
                            onChange={(newType) => setAttributes({ type: newType })}
                            __nextHasNoMarginBottom
                        />
                        <SelectControl 
                            label="Style" 
                            value={style} 
                            options={[
                                { label: 'Style 1', value: 'style1' },
                            ]} 
                            onChange={(newStyle) => setAttributes({ style: newStyle })}
                            __nextHasNoMarginBottom
                        />
                        <RangeControl
                            label="Nombre de posts"
                            value={quantity}
                            onChange={(newQuantity) => setAttributes({ quantity: newQuantity })}
                            min={-1}
                            max={10}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={`posts-block ${style}`}>
                    <Fragment>
                        {posts ? (
                            posts.map((post) => (
                                <div key={post.id} className="post-item">
                                    <h3>{post.title.rendered}</h3>
                                    {post.excerpt?.rendered ? (<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />) : ( <p></p> )}</div>
                            ))
                        ) : (
                            <p>Chargement...</p>
                        )}
                    </Fragment>
                </div>
            </div>
        );
    },
});