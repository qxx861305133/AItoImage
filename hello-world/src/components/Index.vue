<template>
  <div>
    <button @click="startRecognition">开始识别</button>
    <p>{{ recognizedText }}</p>
    <ul class="flex-wrap img-box">
      <li v-for="item in imgList" :key="item">
        <img
          class="img-size"
          v-lazy="item"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import annyang from 'annyang';

export default {
  data() {
    return {
      recognizedText: '',
      imgList: []
    };
  },
  methods: {
    startRecognition() {
      if (annyang) {
        this.loadImages()
        annyang.start({ autoRestart: false, continuous: false });
        // 设置识别语言为中文
        annyang.setLanguage('zh-CN');

        annyang.addCallback('result', (phrases) => {
          console.log('phrases', phrases)
          if (phrases && phrases.length > 0) {
            this.recognizedText = phrases[0];
          }
        });
      } else {
        this.recognizedText = 'Web Speech API not supported';
      }
    },
    loadImages() {
      const folderPath = require.context('../assets/images/result', false, /\.(png|jpe?g|gif|svg)$/);
      const images = folderPath.keys().map((key) => folderPath(key));
      this.imgList = images;
      // // 本地静态文件夹路径
      // const folderPath = '../assets/result-list';
      // // 使用require.context来动态加载文件夹下的所有图片
      // const images = require.context(folderPath, false, /\.(png|jpe?g|gif|svg)$/);
      // // 遍历加载图片并将路径添加到images数组
      // images.keys().forEach((key) => {
      //   const imagePath = images(key);
      //   this.imgList.push(imagePath);
      // })
      this.observeImages()
    },
    observeImages() {
      const images = Array.from(document.querySelectorAll('.lazy-image'));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const imageIndex = parseInt(entry.target.dataset.index);
              this.imgList[imageIndex].isVisible = true;
            }
          });
        },
        {
          rootMargin: '0px',
          threshold: 0.1,
        }
      );

      images.forEach(image => {
        observer.observe(image);
        this.imgList.push({
          src: '',
          alt: '',
          isVisible: false,
        });
      });
    },
    imageLoaded(index) {
      const image = this.imgList[index];
      image.src = image.originalSrc;
      image.alt = image.originalAlt;
    },
  },
  beforeDestroy() {
    if (annyang) {
      annyang.abort();
    }
  },
};
</script>
<style scoped>
  .lazy-image {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .lazy-image.is-visible {
    opacity: 1;
  }
  .img-size {
    width: 500px;
    object-fit: contain;
  }
</style>
