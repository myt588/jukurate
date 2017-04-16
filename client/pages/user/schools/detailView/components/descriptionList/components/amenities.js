Template.amenities.helpers({
	links() {
		let iconDict = {
			'Accepts Credit Cards': 'icon-credit-card',
			'Parking': 'icon-parking',
			'Bike Parking': 'icon-bicycle',
			'Wheelchair Accessible': 'icon-wheelchair',
			'Wi-fi': 'icon-wifi',
			'Tv': 'icon-screen',
			'Projector': 'icon-screen',
			'Smoking Room': 'icon-pipe'
		};
		let items = Template.instance().data.items;
		let links = '';
		for (i in items) {
			links += '<a href="#" class="'+ iconDict[items[i]] + '">' + items[i] + '</a>';
		}
		return links
	}
});