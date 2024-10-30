/**
 * Editable Block Example
 *
 * https://github.com/modularwp/gutenberg-block-editable-example
 */
( function() {
    const { __ } = wp.i18n;
    const { registerBlockType } = wp.blocks;
    var el = wp.element.createElement; // The wp.element.createElement() function to create elements.
    var editor = wp.editor; // The wp.element.createElement() function to create elements.
    var RichText          = wp.editor.RichText; // For creating editable elements.
    const { MediaUpload } = wp.editor;

    /**
     * Register block
     *
     * @param  {string}   name     Block name.
     * @param  {Object}   settings Block settings.
     * @return {?WPBlock}          Block itself, if registered successfully,
     *                             otherwise "undefined".
     */
    registerBlockType(
        'casia/infoblock', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        {
            title: __( 'Casia infoblock' ),
            icon: 'lock',
            category: 'common',
            attributes: {
                title: {
                    type: 'string',
                    default: 'title',
                },
                content: {
                    type: 'string',
                    default: 'content',
                },
                imgUrl: {
                    type: 'string',
                    default: 'http://placehold.it/500'
                }
            },
            // Defines the block within the editor.
            edit: function( props ) {
                var title = props.attributes.title;
                var content = props.attributes.content;
                var imgUrl = props.attributes.imgUrl;

                function onChangeTitle( updatedContent ) {
                    props.setAttributes( { title: updatedContent } );
                }

                function onChangeContent( updatedContent ) {
                    props.setAttributes( { content: updatedContent } );
                }

                function selectImage(value) {
                    props.setAttributes( { imgUrl: value.sizes.full.url } );
                }

                return el(
                    'div', // Tag type.
                    {className: 'casia-infoblock'}, // The class="wp-block-gb-01-basic" : The class name is generated using the block's name prefixed with wp-block-, replacing the / namespace separator with a single -.
                    React.createElement('div', {className: 'casia-infoblock__upper'},
                        React.createElement( MediaUpload, {
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
                        React.createElement(RichText, {tagName: 'p', value: props.attributes.title, onChange: onChangeTitle}), 
                    ),
                    React.createElement(RichText, {tagName: 'p', value: props.attributes.content, onChange: onChangeContent, className: 'casia-infoblock__bottom'}),
                );
            },

            // Defines the saved block.
            save: function( props ) {
                const imgUrl = props.attributes.imgUrl;
                const content = props.attributes.content;
                const title = props.attributes.title;

                function brTags(str) {
                    var regex = /<br\s*[\/]?>/gi;
                    return str.replace(regex, "\n");
                }

                var contentProcessed = brTags(content);

                return (
                    el('div', {className: 'casia-infoblock'},
                        el('div', {className: 'casia-infoblock__upper'},
                            el('img', {
                                src: imgUrl,
                                alt: "Infoblock image"
                            } ),
                            el('p', {}, title )
                        ),
                        el('p', {className: 'casia-infoblock__bottom'}, contentProcessed)
                    )
                );
            },
        }
    );
})();