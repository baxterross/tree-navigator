var data = {
	name: 'Combined Holdings',
	type: 'Client',
	children: [
		{
			name: 'Western Division',
			type: 'Division',
			children: [
				{
					name: 'Southern California',
					type: 'Region',
					children: [
						{
							name: 'Arthur Arena',
							type: 'Building',
							children: []
						},
						{
							name: 'Baker Building',
							type: 'Building',
							children: [
								{
									name: 'Bank Branch',
									type: 'Tenant',
									children: []
								},
								{
									name: 'Randy\'s Retail',
									type: 'Tenant',
									children: []
								},
								{
									name: 'Clara\'s Cafe',
									type: 'Tenant',
									children: []
								}
							]
						},
						{
							name: 'Capital Complex',
							type: 'Building Complex',
							children: [
								{
									name: 'Building 1',
									type: 'Building',
									children: [
										{
											name: 'MajorCorp Inc',
											type: 'Tenant',
											children: [
												{
													name: 'Floor 1',
													type: 'Floor',
													children: []
												},
												{
													name: 'Floor 2',
													type: 'Floor',
													children: []
												}
											]
										},
										{
											name: 'Floor 3',
											type: 'Floor',
											children: [
												{
													name: 'Tertiary Tenant',
													type: 'Tenant',
													children: []
												}
											]
										}
									]
								},
								{
									name: 'Building 2',
									type: 'Building',
									children: [
										{
											name: 'Tenant One',
											type: 'Tenant',
											children: []
										},
										{
											name: 'Tenant Two',
											type: 'Tenant',
											children: []
										}
									]
								}
							]
						}
					]
				},
				{
					name: 'Northern California',
					type: 'Region',
					children: [
					]
				}
			]
		},
		{
			name: 'Rocky Mountain Division',
			type: 'Division',
			children: [
				{
					name: 'Colorado',
					type: 'Region',
					children: [
						{
							name: 'Golden Condominiums',
							type: 'Building Complex',
							children: [
								{
									name: 'Building 100',
									type: 'Building',
									children: []
								},
								{
									name: 'Building 200',
									type: 'Building',
									children: []
								}
							]
						}
					]
				},
				{
					name: 'Utah',
					type: 'Region',
					children: [
						{
							name: 'Provo Apartments',
							type: 'Building',
							children: [
							]
						},
						{
							name: 'SLC Convention Center',
							type: 'Building',
							children: []
						}
					]
				}
			]
		}
	]
};

(function(window, document) {

	var TreeNavigator = function(element, tree) {
		this.element = element;
		this.tree = tree;
		this.path = [];

		this.init = function() {
			this.render();
		}.bind(this);

		this.down = function(offset) {
			this.path.push(offset);
			this.render();
		}.bind(this);

		this.up = function() {
			this.path.pop();
			this.render();
		}.bind(this);

		this.pick = function(branch, path) {
			var offset, i;
			for (i = 0; i < path.length; i++) {
				offset = path[i];
				if (branch.children.length <= offset) {
					console.log('Invalid path');
				} else {
					branch = branch.children[offset];
				}
			}
			return branch;
		}.bind(this);

		this.render = function() {
			var node = this.pick(this.tree, this.path),
				list = document.createElement('ul'),
				i, child, element, callback	;

			callback = null;
			if (this.path.length > 0) {
				callback = this.up;
			}
			element = this.renderNode(node.name, callback);
			element.style.fontWeight = 'bold';
			list.appendChild(element);

			for (i = 0; i < node.children.length; i++) {
				child = node.children[i];
				callback = null
				if (child.children && child.children.length > 0) {
					callback = this.down.bind(this, i);
				}
				element = this.renderNode(child.name, callback);
				list.appendChild(element);
			}

			list.classList.add('node-list');
			this.displayElement(list);
		}.bind(this);

		this.renderNode = function(name, callback) {
			var element = document.createElement('li');
			element.classList.add('node');
			element.innerHTML = name;
			if (callback) {
				element.onclick = callback;
			} else {
				element.classList.add('disabled');
			}
			return element;
		}.bind(this);

		this.displayElement = function(element) {
			var parent = this.element.parentElement;
			parent.replaceChild(element, this.element);
			this.element = element;
		}.bind(this);
	};

	var element = document.querySelector('.tree-navigator');
	var navigator = new TreeNavigator(element, data);
	navigator.init();
	window.navigator = navigator;

} (window, document));