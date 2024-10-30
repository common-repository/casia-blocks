( function() {
    const { __ } = wp.i18n;
    const { registerBlockType } = wp.blocks;
    var el = wp.element.createElement; // The wp.element.createElement() function to create elements.
    var RichText          = wp.editor.RichText; // For creating editable elements.
    const { InnerBlocks, MediaUpload } = wp.editor;

    const ALLOWED_MEDIA_TYPES = [ 'image' ];

    /**
     * Register block
     *
     * @param  {string}   name     Block name.
     * @param  {Object}   settings Block settings.
     * @return {?WPBlock}          Block itself, if registered successfully,
     *                             otherwise "undefined".
     */
    registerBlockType( 'casia/showcase', {
            title: __( 'Casia showcase' ),
            icon: 'lock',
            category: 'common',
            attributes: {
                content: {
                    type: 'string',
                    default: 'Editable block content...',
                },
                content2: {
                    type: 'string',
                    default: 'Editable block content...',
                },
                imgUrl: {
                    type: 'string',
                    default: casia_data.placeholder_img_url
                }
            },
            edit: function( props ) {
                var content = props.attributes.content;
                var content2 = props.attributes.content2;
                var imgUrl = props.attributes.imgUrl;

                function onChangeContent( updatedContent ) {
                    props.setAttributes( { content: updatedContent } );
                }

                function onChangeContent2( updatedContent ) {
                    props.setAttributes( { content2: updatedContent } );
                }

                function selectImage(value) {
                    props.setAttributes( { imgUrl: value.sizes.full.url } );
                }

                return el(
                            'div', // Tag type.
                            {className: 'casia-showcase'},
                            el(
                                'div', // Tag type.
                                {className: 'casia-showcase__img'},
                                el(
                                    MediaUpload,
                                    {
                                        className: 'casia-showcase__img',
                                        onSelect: selectImage,
                                        type: 'image',
                                        render: function( obj ) {
                                            return el( 'img', {
                                                    onClick: obj.open,
                                                    src: props.attributes.imgUrl
                                                }
                                            );
                                        }
                                    }
                                )
                            ),
                            el(
                                'div',
                                {className: 'casia-showcase__info'},
                                el(
                                    RichText, {className: "casia-showcase__number", onChange: onChangeContent, value: content},
                                ),
                                el(
                                    RichText, {className: "casia-showcase__text", onChange: onChangeContent2, value: content2}
                                ),
                            )
                        )
            },

            save: function( props ) {
                var content = props.attributes.content;
                var content2 = props.attributes.content2;
                var imgUrl = props.attributes.imgUrl;

                function brTags(str) {
                    var regex = /<br\s*[\/]?>/gi;
                    return str.replace(regex, "\n");
                }

                var contentProcessed = brTags(content);
                var contentProcessed2 = brTags(content2);

                return el(
                            'div',
                            {className: 'casia-showcase'},
                            el(
                                'div',
                                {className: 'casia-showcase__img'},
                                el('img', {
                                    src: imgUrl,
                                    alt: "Showcase image"
                                } ),
                            ),
                            el(
                                'div',
                                {className: 'casia-showcase__info'},
                                el(
                                    'p',
                                    {className: 'casia-showcase__number'},
                                    contentProcessed
                                ),
                                el(
                                    'p',
                                    {className: 'casia-showcase__text'},
                                    contentProcessed2
                                ),
                            )
                        )
            }
        }
    );
})();