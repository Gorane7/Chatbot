
let app = new Vue({
	
	el: '#app',
	data: {
		editMode: false,
		error: 'No error',
		languages: [
			{ name: 'Vue.js', votes: 0},
			{ name: 'React', votes: 0},
			{ name: 'Angular', votes: 0 }
		]
	},
	methods: {
		voteFor: function(f) {
			f.votes += 1
			this.languages.sort(function(a,b){return b.votes - a.votes})
			this.save()
		},
		addNew: function(event) {
			this.languages.push({
				name: event.target.value,
				votes: 0
			})
			event.target.value = ''
			this.save()
		},
		remove: function(f) {
			this.languages = this.languages.filter(i => i != f)
			this.save()
		},
		load: function() {
			let data = localStorage.getItem('saved')
			if (data) {
				this.languages = JSON.parse(data)
			}
		},
		save: function() {
			let data = JSON.stringify(this.languages)
			localStorage.setItem('saved', data)
		},
		toggleEditMode: function() {
			this.editMode = !this.editMode
		}
	},
	created: function() {
		this.load()
	}
	
});
