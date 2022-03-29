<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
  </div>
</template>

<script>
import plugins from './plugins'
import toolbar from './toolbar'
import font from './font'
import load from './dynamicLoadScript'

// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
// const tinymceCDN = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js'
const tinymceCDN = `${window.location.origin}/${process.env.VUE_APP_COMMON_PATH}/static/tinymce/tinymce.min.js`

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: '' // file edit insert view format table
    },
    height: {
      type: [Number, String],
      required: false,
      default: 460
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${_this.tinymceId}`,
        language: _this.languageTypeList['zh'],
        min_height: _this.height,
        resize: true,
        body_class: 'panel-body', // 为编辑区body指定类或id
        object_resizing: true, // 调整大小控件开关
        toolbar: _this.toolbar.length > 0 ? _this.toolbar : toolbar,
        menubar: _this.menubar,
        plugins: plugins, // 指定需加载的插件
        end_container_on_empty_block: true, // 空元素回车将其拆分
        powerpaste_word_import: 'clean',
        fontsize_formats: font.fontsize_formats,
        font_formats: font.font_formats,
        image_advtab: true, // 图片高级属性
        default_link_target: '_blank', // 超链接默认打开方式
        link_title: false, // 超链接
        nonbreaking_force_tab: true, // 允许使用tab键
        branding: false, // 隐藏右下角技术支持
        elementpath: false, // 隐藏底栏的元素路径
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            _this.hasChange = true
            _this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        images_upload_handler(blobInfo, success, failure, progress) {
          /* progress(0)
          getToken(params).then(response => {
            success(url)
            progress(100)
          }).catch(err => {
            failure('上传失败，请刷新页面后重试')
            console.log(err)
          }) */
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
