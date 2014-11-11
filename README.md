#adapt-textPlus

A presentation component based on the adapt core contributed text component, with two modifications: an optional graphic and the ability to use popups to present lengthy content when device screensize is small.


##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-textPlus

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:

        "adapt-textPlus": "*"

##Usage

This is a presentation component with optional graphic, displayTitle, body, and instruction elements. The graphic element allows for optimization for various devices, swapping out images based on screen size. (`screenSize`--small, medium, and large--is specified in theme.json.)

##Settings overview

An complete example of this components settings can be found in the [example.json](https://github.com/chucklorenz/adapt-textPlus/blob/master/example.json) file. A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)

####_component

This value must be: `textPlus`

####_classes

You can use this setting to add custom classes to your template and LESS file.

####_layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`. 

####displayTitle, body, instruction

The `_graphic`,`displayTitle`, `body`, and `instruction` settings can be left blank. However, in this case the blank component would be better suited: [adapt-contrib-blank](https://github.com/adaptlearning/adapt-contrib-blank)

####_graphic

The image for this component is defined within this element. The `_graphic` element should contain only one value for `alt`, `title`, `large`, `medium` and `small`. The `_graphic` element can be used without `displayTitle`, `body`, and `instruction`. However, in this case the graphic component would be better suited: [adapt-contrib-graphic](https://github.com/adaptlearning/adapt-contrib-graphic).

####alt

The `alt` setting provides alternative information for the image.

####title

This setting is for the title attribute on the image.

####large

Enter a path to the image for large device width. Paths should be relative to the src folder, e.g., course/en/images/pic8_lg.jpg.

####medium

Enter a path to the image for medium device width. Paths should be relative to the src folder, e.g., course/en/images/pic8_md.jpg.

####small

Enter a path to the image for small device width. Paths should be relative to the src folder, e.g., course/en/images/pic8_sm.jpg.

####_maxBodyCharacters

When device.screenSize equals small (e.g., smartphones), this setting specifies the number of characters of the body content that will be displayed. If the body content exceeds this number, an ellipsis will replace the excess and it will be followed by a link to a popup of the complete body content. If not specified, `_maxBodyCharacters` defaults to 100. To prevent the use of popups, set `_maxBodyCharacters` to a number greater than the body's character count.

####moreText

A word, phrase, or other representation in characters that indicate that more content will be displayed in a popup by clicking this link. If not specified, `moreText` defaults to `More`.

##Limitations

To be completed.

##Browser spec

To be completed.

