'use strict';

const gulp = require('gulp'),
	postCss=require('gulp-postcss'),
	sass=require('gulp-sass'),
	customMedia= require('postcss-custom-media'),
	mediaMinMax= require('postcss-media-minmax'),
	cssNano =require('cssnano'),
	assets= require('postcss-assets'),
	browserSync = require('browser-sync').create();;

let postCssPlugins=[
	customMedia,
	mediaMinMax,
	cssNano({
		//Añadir el autoprefixer
		autoprefixer:{
			add:true
		},
		//Para que minifique o no el código
		core:false
	}),
	assets({
		//Array con las carpetas donde vamos a buscar
		loadPaths:['img'],
		//La ruta va ser relativa al origen
		relative:true,
		/*Añade Urls apsolutas en la compilación y tiene que estar 
		//relative en false
		baseUrl:'http://mauriciobrito.nset/files',*/

		//Es la carpeta base donde va a buscar
		//'../assets/img/v.jpg'//
		basePath:'dist/assets',
		/*Añade los cambios de cache de los recursos cacheados*/
		cachebuster:true
		/*Detecta si se le hecieron cambios al recurso porque lee los metadatos
		de este.+ */
	})
];

gulp.task('styles', ()=>{

	gulp.src('./src/*.scss')
	.pipe(sass().on('error', sass.logError))//tarea sass
	.pipe(postCss(postCssPlugins))//tarea postcss
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.stream());
});

gulp.task('default',() =>{

	//Servidor y recarga automatica
	browserSync.init({
        server: "./"
    });

	//gulp.watch('./dist/*.css',['styles'])
    gulp.watch("./src/*.scss", ['styles']);
    gulp.watch("./src/components/*.scss", ['styles']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
	

	}
);