<template lang="html">
    <div class="list">
        <!-- movie list -->
        <mu-table :fixedHeader="true" :showCheckbox="false" :height="height">
            <mu-thead slot="header">
                <mu-th>电影海报</mu-th>
                <mu-th>电影名称</mu-th>
                <mu-th>简介</mu-th>
                <mu-th>评分</mu-th>
                <mu-th>操作</mu-th>
            </mu-thead>
            <mu-tbody>
                <mu-tr v-for="movie of movies">
                    <mu-td>
                        <img :src="movie.image" class="posterImg">
                    </mu-td>
                    <mu-td><h3>{{movie.title}}</h3></mu-td>
                    <mu-td><span class="movie-introduction">{{movie.introduction}}</span></mu-td>
                    <mu-td>{{movie.rating}}</mu-td>
                    <mu-td>
                        <mu-raised-button @click="showDetail(movie.title)" label="详细" primary/>
                        <mu-raised-button @click="openEditMovieModal(movie)" label="修改" primary/>
                        <mu-raised-button @click="removeMovie(movie)" label="删除" secondary/>
                    </mu-td>
                </mu-tr>
            </mu-tbody>
        </mu-table>
         <!-- 添加电影按钮 -->
         <mu-float-button icon="add" class="add-movie-button" backgroundColor @click="openAddMovieModal"/>
         <!-- 添加电影表单 -->
        <vodal :show="addMovieModal" animation="slideDown" :width="500" :height="480" :closeButton="false">
          <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/><br/>
          <mu-text-field v-model="image" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/><br/>
          <mu-text-field v-model="introduction" multiLine :rows="2" :rowsMax="4" fullWidth icon="description" label="简介" labelFloat/><br/>
          <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/><br/>
          <mu-raised-button @click="closeModal" label="取消" icon="undo"  />
          <mu-raised-button @click="addMovie" label="确定" icon="check" primary/>
        </vodal>
         <!-- 修改电影表单 -->
        <vodal :show="editMovieModal" animation="slideDown" :width="500" :height="480" :closeButton="false">
          <mu-text-field v-model="title" fullWidth icon="movie" label="电影名称" labelFloat/><br/>
          <mu-text-field v-model="image" fullWidth icon="picture_in_picture" label="海报地址" labelFloat/><br/>
          <mu-text-field v-model="introduction" multiLine :rows="2" :rowsMax="4" fullWidth icon="description" label="简介" labelFloat/><br/>
          <mu-text-field v-model="rating" fullWidth icon="star" label="评分" labelFloat/><br/>
          <mu-raised-button @click="closeModal" label="取消" icon="undo" />
          <mu-raised-button @click="editMovie" label="确定" icon="check" primary/>
        </vodal>



    </div>
</template>
<script>
export default {
  created() {
    this.getMovies();
    document.title = this.$route.name;
  },
  data() {
    return {
      height: '700px',
      title: '',
      image: '',
      rating: null,
      introduction: '',
      movie_id: '',
      movies: [],
      addMovieModal: false,
      editMovieModal: false
    }
  },
  methods: {
    getMovies() {
      this.$http.get('/api/movie').then(res => {
          this.movies = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    openAddMovieModal(){
        this.addMovieModal =true;
    },
    closeModal(){
        this.addMovieModal =false;
        this.editMovieModal =false;
        this.title = '';
        this.image = '';
        this.introduction = '';
        this.rating = null;
        this.movie_id = '';
    },
    addMovie(){
        this.$http.post('/api/movie',{
            title: this.title,
            image: this.image,
            introduction: this.introduction,
            rating: this.rating
        }).then(res =>{
            this.addMovieModal = false;
            this.getMovies();
        });
    },
    openEditMovieModal(movie){
        this.editMovieModal = true;
        this.title= movie.title;
        this.image = movie.image;
        this.introduction = movie.introduction;
        this.rating = movie.rating;
        this.movie_id = movie._id;
    },
    showDetail(title){
        this.$router.push(`/movie/${title}`);
    },
    editMovie(){
        this.editMovieModal = false;
        let id = this.movie_id;
        this.$http.put(`/api/movie/${id}`, {
            title: this.title,
            image: this.image,
            introduction: this.introduction,
            rating: this.rating
        }).then(res=>{
            this.toastr.success('修改电影成功');
            this.editMovieModal =false;
            this.title = '';
            this.image = '';
            this.introduction = '';
            this.rating = null;
            this.movie_id = '';
            this.getMovies();
        })
    },
    removeMovie(movie){
        let id = movie._id
        console.log(id);
        this.$http.delete(`/api/movie/${id}`).then(res =>{
            this.toastr.success('删除成功');
            console.log(res.data);
            this.getMovies();
        })
    }

  }
}
</script>
<style lang="css">
  .mu-th{
      text-align: center !important;
  }
  .mu-td{
      text-align: center !important;
  }
  .movie-poster{
    width: 80px;
    padding: 4px 0;
  }
  .movie-introduction{
    white-space: normal;
    padding:4px 4px;
    letter-spacing: 1px;
    font-size: 14px;
    text-align: left;
  }
  .posterImg{
      width: 100px;
      height: 100px;
      border-radius: 6px;
  }
</style>
