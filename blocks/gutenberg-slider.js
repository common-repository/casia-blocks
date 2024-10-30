( function() {
    const { __ } = wp.i18n;
    const { registerBlockType } = wp.blocks;
    var el = wp.element.createElement; // The wp.element.createElement() function to create elements.
    const { editor, MediaUpload, RichText, URLInput, PlainText } = wp.editor;
    const InspectorControls = wp.editor.InspectorControls;

    /**
     * Register block
     *
     * @param  {string}   name     Block name.
     * @param  {Object}   settings Block settings.
     * @return {?WPBlock}          Block itself, if registered successfully,
     *                             otherwise "undefined".
     */
    registerBlockType(
        'casia/slider', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        {
            title: __( 'Casia slider' ),
            icon: 'lock',
            category: 'common',
            attributes: {
                content: {
                    type: 'string',
                    default: 'content',
                },
                content2: {
                    type: 'string',
                    default: 'content',
                },

                content3: {
                    type: 'string',
                    default: 'content',
                },

                imgUrl: {
                    type: 'string',
                    default: 'https://dummyimage.com/934x139/adabad/fff.png'
                },
                imgUrl2: {
                    type: 'string',
                    default: 'https://dummyimage.com/934x139/adabad/fff.png'
                },
                imgUrl3: {
                    type: 'string',
                    default: 'https://dummyimage.com/934x139/adabad/fff.png'
                },
            },
            // Defines the block within the editor.
            edit: function( props ) {
                var content = props.attributes.content;
                var content2 = props.attributes.content2;
                var content3 = props.attributes.content3;

                var imgUrl = props.attributes.imgUrl;
                var imgUrl2 = props.attributes.imgUrl2;
                var imgUrl3 = props.attributes.imgUrl3;

                function onChangeContent( updatedContent ) {
                    props.setAttributes( { content: updatedContent } );
                }

                function onChangeContent2( updatedContent ) {
                    props.setAttributes( { content2: updatedContent } );
                }

                function onChangeContent3( updatedContent ) {
                    props.setAttributes( { content3: updatedContent } );
                }


                function selectImage(value) {
                    props.setAttributes( { imgUrl: value.sizes.full.url } );
                }

                function selectImage2(value) {
                    props.setAttributes( { imgUrl2: value.sizes.full.url } );
                }

                function selectImage3(value) {
                    props.setAttributes( { imgUrl3: value.sizes.full.url } );
                }

                return [
                    el(
                        InspectorControls,
                        { key: 'controls' },
                            el(
                                'p',
                                {
                                    className: 'casia-slider__p'
                                },
                                'Slide 1'
                            ),
                            el(
                                PlainText,
                                {
                                    value: content,
                                    onChange: onChangeContent
                                }
                            ),
                            el( MediaUpload, {
                                onSelect: selectImage,
                                type: 'image',
                                render: function( obj ) {
                                    return el( 'img', {
                                            onClick: obj.open,
                                            src: props.attributes.imgUrl
                                        }
                                    );
                                }
                            }),

                            el(
                                'p',
                                {
                                    className: 'casia-slider__p'
                                },
                                'Slide 2'
                            ),
                            el(
                                PlainText,
                                {
                                    value: content2,
                                    onChange: onChangeContent2
                                }
                            ),
                            el( MediaUpload, {
                                onSelect: selectImage2,
                                type: 'image',
                                render: function( obj ) {
                                    return el( 'img', {
                                            onClick: obj.open,
                                            src: props.attributes.imgUrl2
                                        }
                                    );
                                }
                            }),

                            el(
                                'p',
                                {
                                    className: 'casia-slider__p'
                                },
                                'Slide 3'
                            ),
                            el(
                                PlainText,
                                {
                                    value: content3,
                                    onChange: onChangeContent3
                                }
                            ),
                            el( MediaUpload, {
                                onSelect: selectImage3,
                                type: 'image',
                                render: function( obj ) {
                                    return el( 'img', {
                                            onClick: obj.open,
                                            src: props.attributes.imgUrl3
                                        }
                                    );
                                }
                            })
                    ),

                    el(
                        'div', // Tag type.
                            { className: 'bootstrap-row' },
                                el( 'div', {
                                    className: 'col-xs-100 casia-slider'
                                },
                                    el( 'div', {},
                                        el( 'img', {
                                            src: imgUrl
                                        },
                                    ),
                                    el( 'p', {},
                                        content
                                    )
                                ),
                                el( 'div', {},
                                        el( 'img', {
                                            src: imgUrl2
                                        },
                                    ),
                                    el( 'p', {},
                                        content2
                                    )
                                ),
                                el( 'div', {},
                                        el( 'img', {
                                            src: imgUrl3
                                        },
                                    ),
                                    el( 'p', {},
                                        content3
                                    )
                                ),

                        )
                    )
                ]
            },

            // Defines the saved block.
            save: function( props ) {
                var content = props.attributes.content;
                var content2 = props.attributes.content2;
                var content3 = props.attributes.content3;

                var imgUrl = props.attributes.imgUrl;
                var imgUrl2 = props.attributes.imgUrl2;
                var imgUrl3 = props.attributes.imgUrl3;

                return (
                    el(
                            'div', // Tag type.
                            { className: 'bootstrap-row' },
                                el( 'div', {
                                    className: 'col-xs-100 casia-slider'
                                },
                                    el( 'div', {},
                                        el( 'img', {
                                            src: imgUrl,
                                            alt: "Slide"
                                        },
                                    ),
                                    el( 'p', {},
                                        content
                                    )
                                ),
                                el( 'div', {},
                                        el( 'img', {
                                            src: imgUrl2,
                                            alt: "Slide"
                                        },
                                    ),
                                    el( 'p', {},
                                        content2
                                    )
                                ),
                                el( 'div', {},
                                        el( 'img', {
                                            src: imgUrl3,
                                            alt: "Slide"
                                        },
                                    ),
                                    el( 'p', {},
                                        content3
                                    )
                                ),

                        )
                    )
                )
            },
        }
    );
})();