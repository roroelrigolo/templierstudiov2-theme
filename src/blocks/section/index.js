import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ColorPalette, RangeControl, ToggleControl, Button } from '@wordpress/components';
import { getColorsFromCSS } from '../../assets/colors';
import { radius } from '../../assets/radius';
import { MediaUpload } from '@wordpress/block-editor';
import './style.css';

import { registerCustomCategory } from "../../category";
registerCustomCategory();

const colors = getColorsFromCSS();

registerBlockType('templierstudiov2-theme/section', {
    title: 'Section',
    icon: 'editor-insertmore',
    category: 'custom-category',
    attributes: {
        isFitContent: { type: 'boolean', default: false },
        width: { type: 'number', default: 100 },
        isFullMobile: { type: 'boolean', default: true },
        backgroundType: { type: 'string', default: 'color' },
        backgroundColor: { type: 'string', default: null },
        backgroundImage: { type: 'string', default: null },
        borderWidth: { type: 'number', default: 0 },
        borderStyle: { type: 'string', default: null },
        borderColor: { type: 'string', default: null },
        borderRadius: { type: 'string', default: radius[0].radius },
        paddingVertical: { type: 'number', default: 0 },
        paddingHorizontal: { type: 'number', default: 0 },
        paddingVerticalUnit: { type: 'string', default: 'rem' },
        paddingHorizontalUnit: { type: 'string', default: 'rem' },
        marginVertical: { type: 'number', default: 0 },
        marginHorizontal: { type: 'number', default: 0 },
        marginVerticalUnit: { type: 'string', default: 'rem' },
        marginHorizontalUnit: { type: 'string', default: 'rem' },
        shadows: { type: 'string', default: 'none' },
        isFlex: { type: 'boolean', default: false },
        flexDirection: { type: 'string', default: 'row' },
        justifyContent: { type: 'string', default: 'start' },
        alignItems: { type: 'string', default: 'stretch' },
        gap: { type: 'number', default: 0 },
        isRowMobile: { type: 'boolean', default: false },
        isReverseMobile: { type: 'boolean', default: false },
        animation: { type: 'string', default: 'none' },
    },
    edit: ({ attributes, setAttributes }) => {
        const {
            isFitContent,
            width,
            isFullMobile,
            backgroundType,
            backgroundColor,
            backgroundImage,
            borderWidth,
            borderStyle,
            borderColor,
            borderRadius,
            paddingVertical,
            paddingHorizontal,
            paddingVerticalUnit,
            paddingHorizontalUnit,
            marginVertical,
            marginHorizontal,
            marginVerticalUnit,
            marginHorizontalUnit,
            shadows,
            isFlex,
            flexDirection,
            justifyContent,
            alignItems,
            gap,
            isRowMobile,
            isReverseMobile,
            animation,
        } = attributes;

        const radiusOptions = radius.map((r) => ({
            label: r.name,
            value: r.radius,
        }));

        const onSelectImage = (media) => {
            setAttributes({
                backgroundImage: media.url,
            });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Taille">
                        <ToggleControl
                            label="Fit-content ?"
                            checked={isFitContent}
                            onChange={(newIsFitContent) => setAttributes({ isFitContent: newIsFitContent })}
                        />
                        {!isFitContent && (
                            <>
                                <RangeControl
                                    label="Taille"
                                    value={width}
                                    onChange={(newWidth) => setAttributes({ width: newWidth })}
                                    min={1}
                                    max={100}
                                />
                                <ToggleControl
                                    label="Full en mobile"
                                    checked={isFullMobile}
                                    onChange={(newIsFullMobile) => setAttributes({ isFullMobile: newIsFullMobile })}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title="Style">
                        <SelectControl
                            label="Type de fond"
                            value={backgroundType}
                            options={[
                                { label: 'Couleur', value: 'color' },
                                { label: 'Image', value: 'image' },
                            ]}
                            onChange={(newBackgroundType) => setAttributes({ backgroundType: newBackgroundType })}
                        />
                        {backgroundType === 'color' && (
                            <ColorPalette
                                label="Couleur de fond"
                                value={backgroundColor}
                                onChange={(newBackgroundColor) => setAttributes({ backgroundColor: newBackgroundColor })}
                                colors={colors}
                            />
                        )}
                        {backgroundType === 'image' && (
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={backgroundImage}
                                render={({ open }) => (
                                    <Button onClick={open} className="button button-primary">
                                        {backgroundImage ? 'Changer l\'image' : 'Choisir une image'}
                                    </Button>
                                )}
                            />
                        )}
                        <SelectControl
                            label="Ombres"
                            value={shadows}
                            options={[
                                { label: 'Aucune', value: 'none' },
                                { label: 'Classique', value: 'classic' },
                            ]}
                            onChange={(newShadows) => setAttributes({ shadows: newShadows })}
                        />
                    </PanelBody>
                    <PanelBody title="Flex">
                        <ToggleControl
                            label="Activer Flexbox (d-flex)"
                            checked={isFlex}
                            onChange={(newIsFlex) => setAttributes({ isFlex: newIsFlex })}
                        />
                        {isFlex && (
                            <>
                                <SelectControl
                                    label="Direction"
                                    value={flexDirection}
                                    options={[
                                        { label: 'Ligne', value: 'row' },
                                        { label: 'Ligne inversé', value: 'row-reverse' },
                                        { label: 'Colonne', value: 'column' },
                                        { label: 'Colonne inversé', value: 'column-reverse' },
                                    ]}
                                    onChange={(newFlexDirection) => setAttributes({ flexDirection: newFlexDirection })}
                                />
                                <SelectControl
                                    label="Alignement horizontal (justify-content)"
                                    value={justifyContent}
                                    options={[
                                        { label: 'Début', value: 'start' },
                                        { label: 'Centre', value: 'center' },
                                        { label: 'Fin', value: 'end' },
                                        { label: 'Espacé uniformément', value: 'between' },
                                        { label: 'Espacé équitablement', value: 'evenly' },
                                        { label: 'Espacé autour', value: 'around' },
                                    ]}
                                    onChange={(newJustifyContent) => setAttributes({ justifyContent: newJustifyContent })}
                                />
                                <SelectControl
                                    label="Alignement vertical (align-items)"
                                    value={alignItems}
                                    options={[
                                        { label: 'Étiré', value: 'stretch' },
                                        { label: 'Début', value: 'start' },
                                        { label: 'Centre', value: 'center' },
                                        { label: 'Fin', value: 'end' },
                                        { label: 'Baseline', value: 'baseline' },
                                    ]}
                                    onChange={(newAlignItems) => setAttributes({ alignItems: newAlignItems })}
                                />
                                <RangeControl
                                    label="Gap"
                                    value={gap}
                                    onChange={(newGap) => setAttributes({ gap: newGap })}
                                    min={0}
                                    max={100}
                                />
                                <ToggleControl
                                    label="Flex row mobile ?"
                                    checked={isRowMobile}
                                    onChange={(newIsRowMobile) => setAttributes({ isRowMobile: newIsRowMobile })}
                                />
                                <ToggleControl
                                    label="Flex reverse mobile ?"
                                    checked={isReverseMobile}
                                    onChange={(newIsReverseMobile) => setAttributes({ isReverseMobile: newIsReverseMobile })}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title="Margin">
                        <div className="inline-control">
                            <RangeControl
                                label="Margin Haut/Bas"
                                value={marginVertical}
                                onChange={(newMarginVertical) => setAttributes({ marginVertical: newMarginVertical })}
                                min={0}
                                max={200}
                            />

                            <SelectControl
                                label="Unité"
                                value={marginVerticalUnit}
                                options={[
                                    { label: 'px', value: 'px' },
                                    { label: 'rem', value: 'rem' },
                                ]}
                                onChange={(newUnit) => setAttributes({ marginVerticalUnit: newUnit })}
                            />
                        </div>
                        <div className="inline-control">
                            <RangeControl
                                label="Margin Gauche/Droite"
                                value={marginHorizontal}
                                onChange={(newMarginHorizontal) => setAttributes({ marginHorizontal: newMarginHorizontal })}
                                min={0}
                                max={200}
                            />

                            <SelectControl
                                label="Unité"
                                value={marginHorizontalUnit}
                                options={[
                                    { label: 'rem', value: 'rem' },
                                    { label: 'px', value: 'px' },
                                ]}
                                onChange={(newUnit) => setAttributes({ marginHorizontalUnit: newUnit })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title="Padding">
                        <div className="inline-control">
                            <RangeControl
                                label="Padding Haut/Bas"
                                value={paddingVertical}
                                onChange={(newPaddingVertical) => setAttributes({ paddingVertical: newPaddingVertical })}
                                min={0}
                                max={200}
                            />

                            <SelectControl
                                label="Unité"
                                value={paddingVerticalUnit}
                                options={[
                                    { label: 'px', value: 'px' },
                                    { label: 'rem', value: 'rem' },
                                ]}
                                onChange={(newUnit) => setAttributes({ paddingVerticalUnit: newUnit })}
                            />
                        </div>
                        <div className="inline-control">
                            <RangeControl
                                label="Padding Gauche/Droite"
                                value={paddingHorizontal}
                                onChange={(newPaddingHorizontal) => setAttributes({ paddingHorizontal: newPaddingHorizontal })}
                                min={0}
                                max={200}
                            />

                            <SelectControl
                                label="Unité"
                                value={paddingHorizontalUnit}
                                options={[
                                    { label: 'rem', value: 'rem' },
                                    { label: 'px', value: 'px' },
                                ]}
                                onChange={(newUnit) => setAttributes({ paddingHorizontalUnit: newUnit })}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title="Bordures de la section">
                        <SelectControl
                            label="Border radius"
                            value={borderRadius}
                            onChange={(newBorderRadius) => setAttributes({ borderRadius: newBorderRadius })}
                            options={radiusOptions}
                        />
                        <RangeControl
                            label="Taille de la bordure"
                            value={borderWidth}
                            onChange={(newBorderWidth) => setAttributes({ borderWidth: newBorderWidth })}
                            min={0}
                            max={10}
                        />
                        <SelectControl
                            label="Style de la bordure"
                            value={borderStyle}
                            options={[
                                { label: 'Solide', value: 'solid' },
                                { label: 'Pointillé', value: 'dashed' }, ,
                            ]}
                            onChange={(newBorderStyle) => setAttributes({ borderStyle: newBorderStyle })}
                        />
                        <ColorPalette
                            label="Couleur de le bordure"
                            value={borderColor}
                            onChange={(newBorderColor) => setAttributes({ borderColor: newBorderColor })}
                            colors={colors}
                        />
                    </PanelBody>
                    <PanelBody title="Animation de la section">
                        <SelectControl
                            label="Animations"
                            value={animation}
                            options={[
                                { label: 'Aucune', value: 'none' },
                                { label: 'Slide bas -> haut', value: 'slide-b-t' },
                                { label: 'Slide haut -> bas', value: 'slide-t-b' },
                                { label: 'Slide gauche -> droite', value: 'slide-l-r' },
                                { label: 'Slide droite -> gauche', value: 'slide-r-l' },
                            ]}
                            onChange={(newAnimation) => setAttributes({ animation: newAnimation })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div
                    style={{
                        background: backgroundType === 'color' ? backgroundColor : `url(${backgroundImage ? backgroundImage : ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: `${borderRadius}px`,
                        '--padding-vertical': `${paddingVertical}${paddingVerticalUnit}`,
                        '--padding-horizontal': `${paddingHorizontal}${paddingHorizontalUnit}`,
                        padding: `${paddingVertical}${paddingVerticalUnit} ${paddingHorizontal}${paddingHorizontalUnit}`,
                        '--margin-vertical': `${marginVertical}${marginVerticalUnit}`,
                        '--margin-horizontal': `${marginHorizontal}${marginHorizontalUnit}`,
                        margin: `${marginVertical}${marginVerticalUnit} ${marginHorizontal}${marginHorizontalUnit}`,
                        width: isFitContent ? 'fit-content' : `${width}%`,
                        ...(borderWidth !== 0 && {
                            borderColor: borderColor,
                            borderWidth: `${borderWidth}px`,
                            borderStyle: borderStyle,
                        }),
                    }}
                    className={`block-section ${isFullMobile ? `full-mobile` : ''} ${shadows !== 'none' ? `sh-${shadows}` : ''} ${animation !== 'none' ? `anim-${animation}` : ''}`.trim()}
                >
                    <div
                        style={{
                            ...(isFlex && { gap: `${gap}px` }),
                            ...(isFlex && { '--gap': `${gap}px` }),
                        }}
                        className={`${isFlex ? `d-flex flex-${flexDirection} justify-content-${justifyContent} align-items-${alignItems}` : ''} ${isRowMobile ? `row-mobile` : ''} ${isReverseMobile ? `reverse-mobile` : ''} mx-auto`}
                    >
                        <InnerBlocks />
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            isFitContent,
            width,
            isFullMobile,
            backgroundType,
            backgroundColor,
            backgroundImage,
            borderStyle,
            borderWidth,
            borderColor,
            borderRadius,
            paddingVertical,
            paddingHorizontal,
            paddingVerticalUnit,
            paddingHorizontalUnit,
            marginVertical,
            marginHorizontal,
            marginVerticalUnit,
            marginHorizontalUnit,
            shadows,
            isFlex,
            flexDirection,
            justifyContent,
            alignItems,
            gap,
            isRowMobile,
            isReverseMobile,
            animation,
        } = attributes;

        return (
            <div
                style={{
                    background: backgroundType === 'color' ? backgroundColor : `url(${backgroundImage ? backgroundImage : ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: `${borderRadius}px`,
                    '--padding-vertical': `${paddingVertical}${paddingVerticalUnit}`,
                    '--padding-horizontal': `${paddingHorizontal}${paddingHorizontalUnit}`,
                    padding: `${paddingVertical}${paddingVerticalUnit} ${paddingHorizontal}${paddingHorizontalUnit}`,
                    '--margin-vertical': `${marginVertical}${marginVerticalUnit}`,
                    '--margin-horizontal': `${marginHorizontal}${marginHorizontalUnit}`,
                    margin: `${marginVertical}${marginVerticalUnit} ${marginHorizontal}${marginHorizontalUnit}`,
                    width: isFitContent ? 'fit-content' : `${width}%`,
                    ...(borderWidth !== 0 && {
                        borderColor: borderColor,
                        borderWidth: `${borderWidth}px`,
                        borderStyle: borderStyle,
                    }),
                }}
                className={`block-section ${isFullMobile ? `full-mobile` : ''} ${shadows !== 'none' ? `sh-${shadows}` : ''} ${animation !== 'none' ? `anim-${animation}` : ''}`.trim()}
            >
                <div
                    style={{
                        ...(isFlex && { gap: `${gap}px` }),
                        ...(isFlex && { '--gap': `${gap}px` }),
                    }}
                    className={`${isFlex ? `d-flex flex-${flexDirection} justify-content-${justifyContent} align-items-${alignItems}` : ''} ${isRowMobile ? `row-mobile` : ''} ${isReverseMobile ? `reverse-mobile` : ''} mx-auto`}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});
