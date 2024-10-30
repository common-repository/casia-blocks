( function() {
    const { __ } = wp.i18n;
    const { registerBlockType } = wp.blocks;
    var el = wp.element.createElement; // The wp.element.createElement() function to create elements.
    const { editor, MediaUpload, RichText, URLInput } = wp.editor;
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
        'casia/griditem', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        {
            title: __( 'Casia griditem' ),
            icon: 'lock',
            category: 'common',
            attributes: {
                content: {
                    type: 'string',
                    default: 'content',
                },
                imgUrl: {
                    type: 'string',
                    default: casia_data.placeholder_img_url
                },
                elUrl: {
                    type: 'string',
                }
            },
            // Defines the block within the editor.
            edit: function( props ) {
                var content = props.attributes.content;
                var imgUrl = props.attributes.imgUrl;
                var elUrl = props.attributes.elUrl;

                function onChangeContent( updatedContent ) {
                    props.setAttributes( { content: updatedContent } );
                }

                function selectImage(value) {
                    props.setAttributes( { imgUrl: value.sizes.full.url } );
                }

                function onChangeUrl( newUrl ) {
                    props.setAttributes( { elUrl: newUrl } );
                }

                return [ 
                    el(
                        InspectorControls,
                        { key: 'controls' },
                            el(
                                URLInput,
                                {
                                    value: elUrl,
                                    onChange: onChangeUrl
                                }
                        )
                    ),
                    el(
                        'div', // Tag type.
                        { className: 'casia-griditem' },
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
                            el(RichText, {tagName: 'p', value: props.attributes.content, onChange: onChangeContent}),
                    )
                ]
            },

            // Defines the saved block.
            save: function( props ) {
                const imgUrl = props.attributes.imgUrl;
                const content = props.attributes.content;
                const elUrl = props.attributes.elUrl;

                function brTags(str) {
                    var regex = /<br\s*[\/]?>/gi;
                    return str.replace(regex, "\n");
                }

                var contentProcessed = brTags(content);

                if (elUrl) {
                    var output = 
                    el('a', {href: elUrl, className: 'casia-griditem-link'}, 
                        el('div', {className: 'casia-griditem'},
                            el('img', {
                                src: imgUrl,
                                alt: 'Griditem image'
                            } ),
                            el('p', {}, contentProcessed)
                        )
                    )
                } else {
                    var output = 
                        el('div', {className: 'casia-griditem'},
                            el('img', {
                                src: imgUrl,
                                alt: 'Griditem image'
                            } ),
                            el('p', {}, contentProcessed)
                        )
                }

                return output;
            },
        }
    );
})();