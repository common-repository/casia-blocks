const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
var RichText          = wp.editor.RichText; // For creating editable elements.
var el = wp.element.createElement; // The wp.element.createElement() function to create elements.

registerBlockType( 'casia/textblock', {
    title: __( 'Casia textblock' ),
    icon: 'lock',
    category: 'common',
    attributes: {
        blocktitle: {
            type: 'text',
            default: 'Editable block content...',
        },
        intro: {
            type: 'text',
            default: 'Editable block content...',
        },
        content: {
            type: 'text',
            default: 'Editable block content...',
        },
    },
    edit: function( props ) {
        var blocktitle = props.attributes.blocktitle;
        var intro = props.attributes.intro;
        var content = props.attributes.content;

        function onChangeContent( updatedContent ) {
            props.setAttributes( { content: updatedContent } );
        }

        function onChangeIntro( updatedContent ) {
            props.setAttributes( { intro: updatedContent } );
        }

        function selectTitle(value) {
            props.setAttributes( { blocktitle: value } );
        }

        return (
            el(
                'div',
                {className: 'casia-textblock'},
                el(
                    'div',
                    {className: 'casia-textblock__upper'},
                    el(
                        RichText,
                        {
                            className: 'casia-editor-h2',
                            value: blocktitle,
                            onChange: selectTitle,
                        },
                        blocktitle
                    ),
                    el(
                        RichText,
                        {
                            value: intro,
                            onChange: onChangeIntro,
                        },
                        intro
                    )
                ),
                el(
                        RichText,
                        {
                            className: 'casia-textblock__bottom',
                            value: content,
                            onChange: onChangeContent,
                        },
                        content
                    ),
            )
        );
    },

    save: function( props ) {
        var blocktitle = props.attributes.blocktitle;
        var intro = props.attributes.intro;
        var content = props.attributes.content;

        function brTags(str) {
            var regex = /<br\s*[\/]?>/gi;
            return str.replace(regex, "\n");
        }

        var blocktitleProcessed = brTags(blocktitle);
        var introProcessed = brTags(intro);
        var contentProcessed = brTags(content);

        return (
            el(
                'div',
                {className: 'casia-textblock'},
                el(
                    'div',
                    {className: 'casia-textblock__upper'},
                    el(
                        'h2',
                        {},
                        blocktitleProcessed
                    ),
                    el(
                        'p',
                        {},
                        introProcessed
                    )
                ),
                el(
                        'div',
                        {
                            className: 'casia-textblock__bottom',
                        },
                        el(
                            'p',
                            {},
                            contentProcessed
                        )
                    ),
            )
        )
    }
} );