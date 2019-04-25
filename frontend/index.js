let app = new Vue({
	el: '#app',
	data: {
		editMode: false,
		frameworks: [
			{ name: 'Vue.js', votes: 0},
			{ name: 'React', votes: 0},
			{ name: 'Angular', votes: 0 }
		]
	},
	methods: {
		voteFor: function(f) {
			f.votes += 1
			this.frameworks.sort(function(a,b){return b.votes - a.votes})
			this.save()
		},
		addNew: function(event) {
			this.frameworks.push({
				name: event.target.value,
				votes: 0
			})
			event.target.value = ''
			this.save()
		},
		remove: function(f) {
			this.frameworks = this.frameworks.filter(i => i != f)
			this.save()
		},
		load: function() {
			let data = localStorage.getItem('saved')
			if (data) {
				this.frameworks = JSON.parse(data)
			}
		},
		save: function() {
			let data = JSON.stringify(this.frameworks)
			localStorage.setItem('saved', data)
		},
		toggleEditMode: function() {
			this.editMode = !this.editMode
		}
	},
	created: function() {
		this.load()
	}
	
})
