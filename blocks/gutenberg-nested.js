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
    const { InnerBlocks } = wp.editor;

    /**
     * Register block
     *
     * @param  {string}   name     Block name.
     * @param  {Object}   settings Block settings.
     * @return {?WPBlock}          Block itself, if registered successfully,
     *                             otherwise "undefined".
     */
    registerBlockType(
        'casia/nested', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
        {
            title: __( 'Casia nested' ),
            icon: 'lock',
            category: 'common',
            // Defines the block within the editor.
            edit: function( props ) {
                return el(
                    'div', // Tag type.
                    { className: 'casia-nested ' + props.attributes.className }, // The class="wp-block-gb-01-basic" : The class name is generated using the block's name prefixed with wp-block-, replacing the / namespace separator with a single -.
                     React.createElement(InnerBlocks)
                );
            },

            // Defines the saved block.
            save: props => {
                return el(
                    'div', // Tag type.
                    { className: 'casia-nested' }, // The class="wp-block-gb-01-basic" : The class name is generated using the block's name prefixed with wp-block-, replacing the / namespace separator with a single -.
                    el(InnerBlocks.Content)
                );
            }
        }
    );
})();