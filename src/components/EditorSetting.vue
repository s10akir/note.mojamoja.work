<template>
  <div id="editor-setting">
    <h1>Editor Setting</h1>
    <b-form-group label="Line Numbers" label-for="lineNumbers">
      <b-form-select
        id="lineNumbers"
        v-model="option.lineNumbers"
        :options="activateOptions"
      />
    </b-form-group>
    <b-form-group label="Key Map" label-for="keyMap">
      <b-form-select
        id="keyMap"
        v-model="option.keyMap"
        :options="keyMapOptions"
      />
    </b-form-group>
    <b-form-group label="Theme" label-for="Theme">
      <b-form-select
        id="theme"
        v-model="option.theme"
        :options="themeOptions"
      />
    </b-form-group>
    <p>{{ option }}</p>
  </div>
</template>

<script>
export default {
  props: ["option"],
  data() {
    return {
      activateOptions: [
        {
          value: true,
          text: "active"
        },
        {
          value: false,
          text: "inactive"
        }
      ],
      keyMapOptions: [
        {
          value: "default",
          text: "default"
        },
        {
          value: "vim",
          text: "vim"
        },
        {
          value: "emacs",
          text: "emacs"
        },
        {
          value: "sublime",
          text: "sublime"
        }
      ],
      themeOptions: [
        {
          value: "3024-day",
          text: "3024-day"
        },
        {
          value: "3024-night",
          text: "3024-night"
        },
        {
          value: "abcdef",
          text: "abcdef"
        },
        {
          value: "ambiance",
          text: "ambiance"
        },
        {
          value: "ambiance-mobile",
          text: "ambiance-mobile"
        },
        {
          value: "base16-dark",
          text: "base16-dark"
        },
        {
          value: "base16-light",
          text: "base16-light"
        },
        {
          value: "bespin",
          text: "bespin"
        },
        {
          value: "blackboard",
          text: "blackboard"
        },
        {
          value: "cobalt",
          text: "cobalt"
        },
        {
          value: "colorforth",
          text: "colorforth"
        },
        {
          value: "darcula",
          text: "darcula"
        },
        {
          value: "duotone-dark",
          text: "duotone-dark"
        },
        {
          value: "duotone-light",
          text: "duotone-light"
        },
        {
          value: "eclipse",
          text: "eclipse"
        },
        {
          value: "elegant",
          text: "elegant"
        },
        {
          value: "erlang-dark",
          text: "erlang-dark"
        },
        {
          value: "gruvbox-dark",
          text: "gruvbox-dark"
        },
        {
          value: "hopscotch",
          text: "hopscotch"
        },
        {
          value: "icecoder",
          text: "icecoder"
        },
        {
          value: "idea",
          text: "idea"
        },
        {
          value: "isotope",
          text: "isotope"
        },
        {
          value: "lesser-dark",
          text: "lesser-dark"
        },
        {
          value: "liquibyte",
          text: "liquibyte"
        },
        {
          value: "lucario",
          text: "lucario"
        },
        {
          value: "material",
          text: "material"
        },
        {
          value: "mbo",
          text: "mbo"
        },
        {
          value: "mdn-like",
          text: "mdn-like"
        },
        {
          value: "midnight",
          text: "midnight"
        },
        {
          value: "monokai",
          text: "monokai"
        },
        {
          value: "neat",
          text: "neat"
        },
        {
          value: "neo",
          text: "neo"
        },
        {
          value: "night",
          text: "night"
        },
        {
          value: "nord",
          text: "nord"
        },
        {
          value: "oceanic-next",
          text: "oceanic-next"
        },
        {
          value: "panda-syntax",
          text: "panda-syntax"
        },
        {
          value: "paraiso-dark",
          text: "paraiso-dark"
        },
        {
          value: "paraiso-light",
          text: "paraiso-light"
        },
        {
          value: "pastel-on-dark",
          text: "pastel-on-dark"
        },
        {
          value: "railscasts",
          text: "railscasts"
        },
        {
          value: "rubyblue",
          text: "rubyblue"
        },
        {
          value: "seti",
          text: "seti"
        },
        {
          value: "shadowfox",
          text: "shadowfox"
        },
        {
          value: "solarized",
          text: "solarized"
        },
        {
          value: "ssms",
          text: "ssms"
        },
        {
          value: "the-matrix",
          text: "the-matrix"
        },
        {
          value: "tomorrow-night-bright",
          text: "tomorrow-night-bright"
        },
        {
          value: "tomorrow-night-eighties",
          text: "tomorrow-night-eighties"
        },
        {
          value: "ttcn",
          text: "ttcn"
        },
        {
          value: "twilight",
          text: "twilight"
        },
        {
          value: "vibrant-ink",
          text: "vibrant-ink"
        },
        {
          value: "xq-dark",
          text: "xq-dark"
        },
        {
          value: "xq-light",
          text: "xq-light"
        },
        {
          value: "yeti",
          text: "yeti"
        },
        {
          value: "yonce",
          text: "yonce"
        },
        {
          value: "zenburn",
          text: "zenburn"
        }
      ]
    };
  }
};
</script>
