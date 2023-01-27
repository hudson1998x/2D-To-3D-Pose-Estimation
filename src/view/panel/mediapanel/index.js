import ComponentPane from './../componentpane';

import FileUploadPlaceholder from './../../ui/file-upload-placeholder';
import './style.css';

/**
* This component displays all added media that has been
* dragged and dropped, when a media item is clicked
* it gets loaded into posenet. 
*/

export default class MediaPanel extends ComponentPane{
	constructor(props){
		super(props);

		this.state = {
			images: [] , 
			videos: [] , 
			errorFiles: []
		}
		//processes files that have been dragged and dropped
		this.processFiles = this.processFiles.bind(this);

		//prevents the default browser dragOver
		this.dragOver = this.dragOver.bind(this);

		//prevents a new tab being opened with
		//the dropping of files.
		this.dragEnd = this.dragEnd.bind(this);
	}
	dragOver(ev){
		ev.preventDefault();
		ev.stopPropagation();
		this.setState({
			isDragOver: true
		});
	}
	dragEnd(ev){
		ev.nativeEvent.preventDefault();
		ev.nativeEvent.stopPropagation();

		this.setState({
			isDragOver: false
		});

		this.processFiles(ev.dataTransfer.files);

		
	}
	processFiles(fileList){
		let images = this.state.images;
		let videos = this.state.videos;
		let errorFiles = this.state.errorFiles;

		for(let i = 0;i < fileList.length;i++){
			let file = fileList[i];
			let reader = new FileReader();

			if ( file.type.indexOf("image/") > -1 ) {

				reader.onload = () => {
					file.preview = reader.result;
					this.setState({
						lastUpdated: Date.now()
					});
				}

				reader.readAsDataURL(file);

				images.push(file);
			} else if ( file.type.indexOf("video/") > -1 ) {
				reader.onload = () => {
					file.src = reader.result;
					this.setState({
						lastUpdated: Date.now()
					});
				}

				reader.readAsDataURL(file);
				videos.push(file);
			} else {
				errorFiles.push(file);
			}
		}
		this.setState({
			images: images , 
			videos: videos , 
			errorFiles: errorFiles , 
			isDragOver:false
		});
	}
	dispatchMediaChange(event , file){
		let ev = new CustomEvent('media-item-change' , {
			detail: {
				file: file
			}
		});
		window.dispatchEvent(ev);
	}
	getErrorItem(file){
		return (
			<div className="error-item">{file.name} is not a video or image</div>
		);
	}
	getImageMediaItem(file){
		if ( !file.preview ) {
			return (
				<div className="loading-item">Loading...</div>
			)
		} else {
			return (
				<div onClick={(event) => { this.dispatchMediaChange(event, file)}} className="media-item">
					<div class="media-preview">
						<img src={file.preview}/>
					</div>
					<div class="media-name">{file.name}</div>
				</div>
			)
		}
	}
	getVideoMediaItem(file){
		if ( !file.poster ) {
			return (
				<div className="loading-item">Loading...</div>
			)
		} else {
			return (
				<div onClick={(event) => { this.dispatchMediaChange(event, file)}} className="media-item">
					<div class="media-preview">
						<video poster={file.poster}>
							<source src={file.src} type={file.type}/>
						</video>
					</div>
					<div class="media-name">{file.name}</div>
				</div>
			)
		}
	}

	content(){
		if ( (this.state.images.length < 1 && this.state.videos.length < 1) || this.state.isDragOver ) {
			return (
				<FileUploadPlaceholder onFilesAdded={this.processFiles}/>
			)
		} else {
			return (
				<div onDragOver={this.dragOver} onDrop={this.dragEnd} className="media-list">
					<label>Issues ({this.state.errorFiles.length})</label>
					{this.state.errorFiles.map((item) => this.getErrorItem(item))}
					<label>Images ({this.state.images.length}) <button><i className="fas fa-plus"></i></button></label>
					{this.state.images.map((item) => this.getImageMediaItem(item))}
					<label>Videos ({this.state.videos.length})</label>
					{this.state.videos.map((item) => this.getVideoMediaItem(item))}
				</div>
			)
		}
	}
}