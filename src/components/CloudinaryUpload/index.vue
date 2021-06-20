<script>
export default {
  name: 'cloudinary-upload',
  props: {
    max: Number,
    caption: String,
    init: {
      type: Object,
      required: true
    },
    imgs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openUploadModal(e) {
      e.preventDefault();
      if (this.$props.max && this.$props.imgs.length+1 > this.$props.max) {
        this.$emit('clErrorMaxFile');
        return;
      };
      window.cloudinary.openUploadWidget(this.$props.init, (error, result) => {
        if (!error && result && result.event === "success") {
          if (
            this.$props.max &&
            this.$props.imgs.length+1 > this.$props.max
          ) {
            this.$emit('clErrorMaxFile');
            return;
          }
          this.$props.imgs.push({...result.info});
          this.$emit("change", this.$props.imgs);
        }
      }).open();
    },
    deleteImg(index) {
      this.$props.imgs.splice(index, 1);
      this.$emit('change', this.$props.imgs);
    }
  }
}
</script>

<template>
  <div>
    <div
      class="container"
      @drop.prevent="drop($event)"
    >
      <div class="cloudinary-upload-wrap">
        <div v-if="!imgs.length" class="beforeUpload">
          <button
            @click="openUploadModal"
            class="over-button-upload"
          >
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Upload Image</title>
              <g id="Upload_Image" data-name="Upload Image">
                <g id="_Group_" data-name="&lt;Group&gt;">
                  <g id="_Group_2" data-name="&lt;Group&gt;">
                    <g id="_Group_3" data-name="&lt;Group&gt;">
                      <circle
                        id="_Path_"
                        data-name="&lt;Path&gt;"
                        cx="18.5"
                        cy="16.5"
                        r="5"
                        style="
                          fill: none;
                          stroke: #303c42;
                          stroke-linecap: round;
                          stroke-linejoin: round;
                        "
                      />
                    </g>
                    <polyline
                      id="_Path_2"
                      data-name="&lt;Path&gt;"
                      points="16.5 15.5 18.5 13.5 20.5 15.5"
                      style="
                        fill: none;
                        stroke: #303c42;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                      "
                    />
                    <line
                      id="_Path_3"
                      data-name="&lt;Path&gt;"
                      x1="18.5"
                      y1="13.5"
                      x2="18.5"
                      y2="19.5"
                      style="
                        fill: none;
                        stroke: #303c42;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                      "
                    />
                  </g>
                  <g id="_Group_4" data-name="&lt;Group&gt;">
                    <polyline
                      id="_Path_4"
                      data-name="&lt;Path&gt;"
                      points="0.6 15.42 6 10.02 8.98 13"
                      style="
                        fill: none;
                        stroke: #303c42;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                      "
                    />
                    <polyline
                      id="_Path_5"
                      data-name="&lt;Path&gt;"
                      points="17.16 11.68 12.5 7.02 7.77 11.79"
                      style="
                        fill: none;
                        stroke: #303c42;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                      "
                    />
                    <circle
                      id="_Path_6"
                      data-name="&lt;Path&gt;"
                      cx="8"
                      cy="6.02"
                      r="1.5"
                      style="
                        fill: none;
                        stroke: #303c42;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                      "
                    />
                    <path
                      id="_Path_7"
                      data-name="&lt;Path&gt;"
                      d="M19.5,11.6V4A1.5,1.5,0,0,0,18,2.5H2A1.5,1.5,0,0,0,.5,4V15A1.5,1.5,0,0,0,2,16.5H13.5"
                      style="
                        fill: none;
                        stroke: #303c42;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                      "
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div v-else class="imgsPreview">
          <div class="imgHolder" v-for="(img, i) in imgs" :key="i">
            <div class="wrap">
              <div class="thumbnail">
                <img v-if="img.resource_type === 'image'" :src="img.secure_url">
                <video v-if="img.resource_type === 'video'" controls autoplay name="media">
                  <source :src="img.secure_url" type="video/mp4">
                </video>
              </div>
              <button type="button" class="delete" @click="deleteImg(--i)">
                <svg
                  class="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div class="plus" @click="openUploadModal" v-if="++i == imgs.length">+</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="caption" class="caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  min-height: 150px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #cecece;
  border-radius: 10px;
  background: #fff;
}
.container .cloudinary-upload-wrap {
  position: relative;
  width: 100%;
  min-height: 150px;
}
.beforeUpload {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.over-button-upload {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: none;
  border: 1px dashed #c6bdbd;
  border-radius: 10px;
}
.over-button-upload svg.icon {
  width: 100%;
  height: 100%;
}
.imgsPreview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.imgHolder {
  padding: 5px;
  display: flex;
  align-items: center;
}
.imgHolder .wrap {
  position: relative;
}
.imgHolder .plus {
  width: 35px;
  height: 35px;
  border: 1px dashed #c2c2c2;
  border-radius: 100%;
  line-height: 30px;
  text-align: center;
  font-size: 2.2rem;
  color: #807b7b;
  margin-left: 10px;
  cursor: pointer;
}
.thumbnail {
  height: 150px;
  width: 150px;
  border-radius: 5px;
  overflow: hidden;
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumbnail video {
  width: 100%;
  height: 100%;
}
.delete {
  background: #f00;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  border: 1px solid #fff;
  color: #fff;
  padding: 3px;
  display: flex;
  position: absolute;
  top: 2px;
  right: 2px;
}
.caption {
  font-size: .8rem;
  padding: 4px 0;
}
</style>