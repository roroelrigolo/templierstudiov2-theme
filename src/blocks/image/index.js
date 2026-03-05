import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, SelectControl, ToggleControl } from '@wordpress/components';
import { radius } from '../../assets/radius';
import './style.css';

registerBlockType('templierstudiov2-theme/image', {
    title: 'Image',
    category: 'custom-category',
    icon: 'format-image',
    attributes: {
        isSizeByRatio: { type: 'boolean', default: true },
        imageUrl: { type: 'string', default: '' },
        widthRatio: { type: 'string', default: '16' },
        heightRatio: { type: 'string', default: '9' },
        width: { type: 'string', default: '200' },
        widthMobile: { type: 'string', default: '100' },
        isHeightAuto: { type: 'boolean', default: true },
        height: { type: 'string', default: '200' },
        heightMobile: { type: 'string', default: '100' },
        borderRadius: { type: 'string', default: radius[0].radius },
        position: { type: 'string', default: 'start' },
        imageAlt: { type: 'string', default: '' },
        objectFit: { type: 'string', default: 'cover' },
    },
    edit: ({ attributes, setAttributes }) => {
        const { isSizeByRatio, imageUrl, widthRatio, heightRatio, width, widthMobile, isHeightAuto, height, heightMobile, borderRadius, position, imageAlt, objectFit } = attributes;

        const radiusOptions = radius.map((r) => ({
            label: r.name,
            value: r.radius,
        }));

        return (
            <div>
                <InspectorControls>
                    <PanelBody title="Options d'image">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageUrl: media.url, imageAlt: media.alt })}
                            type="image"
                            render={({ open }) => (
                                <Button onClick={open} className="button button-primary">
                                    {imageUrl ? 'Changer l’image' : 'Ajouter une image'}
                                </Button>
                            )}
                        />
                        <ToggleControl
                            label="Taille via le ratio ?"
                            checked={isSizeByRatio}
                            onChange={(newIsSizeByRatio) => setAttributes({ isSizeByRatio: newIsSizeByRatio })}
                        />

                        {isSizeByRatio && (
                            <>
                                <TextControl
                                label="Ratio largeur"
                                type="number"
                                value={widthRatio}
                                onChange={(value) => setAttributes({ widthRatio: value })}
                                />

                                <TextControl
                                label="Ratio hauteur"
                                type="number"
                                value={heightRatio}
                                onChange={(value) => setAttributes({ heightRatio: value })}
                                />
                            </>
                        )}

                        {!isSizeByRatio && (
                            <>
                                <TextControl
                                label="Largeur"
                                type="number"
                                value={width}
                                onChange={(value) => setAttributes({ width: value })}
                                />
                                <TextControl
                                label="Largeur mobile"
                                type="number"
                                value={widthMobile}
                                onChange={(value) => setAttributes({ widthMobile: value })}
                                />

                                <ToggleControl
                                    label="Hauteur automatique ?"
                                    checked={isHeightAuto}
                                    onChange={(newIsHeightAuto) => setAttributes({ isHeightAuto: newIsHeightAuto })}
                                />

                                {!isHeightAuto && (
                                    <>
                                        <TextControl
                                        label="Hauteur"
                                        type="number"
                                        value={height}
                                        onChange={(value) => setAttributes({ height: value })}
                                        />
                                        <TextControl
                                        label="Hauteur mobile"
                                        type="number"
                                        value={heightMobile}
                                        onChange={(value) => setAttributes({ heightMobile: value })}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        <SelectControl
                            label="Fit de l'image"
                            value={objectFit}
                            options={[
                                { label: 'Couvrir', value: 'cover' },
                                { label: 'Contenir', value: 'contain' },
                            ]}
                            onChange={(newObjectFit) => setAttributes({ objectFit: newObjectFit })}
                        />
                    
                        <SelectControl
                            label="Border radius"
                            value={borderRadius}
                            onChange={(newBorderRadius) => setAttributes({ borderRadius: newBorderRadius })}
                            options={radiusOptions}
                        />

                        <SelectControl
                            label="Positon"
                            value={position}
                            options={[
                                { label: 'Gauche', value: 'start' },
                                { label: 'Milieu', value: 'center' },
                                { label: 'Droite', value: 'end' },
                            ]}
                            onChange={(newPosition) => setAttributes({ position: newPosition })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="image-block" style={{"justify-content": `${position}`}}>
                    {imageUrl && (
                        <>
                            { isSizeByRatio && (
                                <img src={imageUrl} alt={imageAlt} style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: `${objectFit}`, 
                                    aspectRatio : `${widthRatio}/${heightRatio}`,
                                    borderRadius: `${borderRadius}px`,
                                }} />
                            )}
                            { !isSizeByRatio && (
                                <img src={imageUrl} alt={imageAlt} style={{ 
                                    width:  `${width}px`, 
                                    '--widthMobile': `${widthMobile}px`,
                                    height: `${isHeightAuto ? `auto` : `${height}px`}`, 
                                    ...(isHeightAuto != "auto" && { '--heightMobile': `${heightMobile}px` }),
                                    objectFit: `${objectFit}`, 
                                    borderRadius: `${borderRadius}px`,
                                }} />
                            )}
                        </>    
                    )}
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { isSizeByRatio, imageUrl, widthRatio, heightRatio, width, widthMobile, isHeightAuto, height, heightMobile, borderRadius, position, imageAlt, objectFit } = attributes;

        return (
            <div className="image-block" style={{"justify-content": `${position}`}}>
                {imageUrl && (
                    <>
                        { isSizeByRatio && (
                            <img src={imageUrl} alt={imageAlt} style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: `${objectFit}`,
                                aspectRatio : `${widthRatio}/${heightRatio}`,
                                borderRadius: `${borderRadius}px`,
                            }} />
                        )}
                        { !isSizeByRatio && (
                            <img src={imageUrl}alt={imageAlt} style={{ 
                                width:  `${width}px`, 
                                '--widthMobile': `${widthMobile}px`,
                                height: `${isHeightAuto ? `auto` : `${height}px`}`, 
                                ...(isHeightAuto != "auto" && { '--heightMobile': `${heightMobile}px` }),
                                objectFit: `${objectFit}`,
                                borderRadius: `${borderRadius}px`,
                            }} />
                        )}
                    </>    
                )}
            </div>
        );
    },
});