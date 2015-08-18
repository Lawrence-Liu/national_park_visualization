import json
parkName = response.xpath('//body/div/div/div[@id="mw-content-text"]/table[@class="wikitable sortable plainrowheaders"]//tr/th[@scope="row"]/a/text()').extract()
states = response.xpath('//body/div/div/div[@id="mw-content-text"]/table[@class="wikitable sortable plainrowheaders"]//tr/td[2]')
stateList = [state.xpath('a/text()').extract() for state in states] 
geoLocation = states.xpath('.//span[@class="geo-dec"]/text()').extract()

def locationTransform(g):
	latitude, longtitude = g.split()
	latitude = ''.join(latitude.split(u'\xb0'))
	longtitude = ''.join(longtitude.split(u'\xb0'))
	latitude = float(latitude[:-1]) if latitude[-1] == 'N' else (0 - float(latitude[:-1]))
	longtitude = float(longtitude[:-1]) if longtitude[-1] == 'E' else (0 - float(longtitude[:-1]))
	return [latitude, longtitude]

data = [{'name': parkName[i], 'latitude': locationTransform(geoLocation[i])[0], 'longtitude': locationTransform(geoLocation[i])[1]} for i in range(59)]

with open('data.json','w') as outfile:
	json.dump(dict(data=data), outfile)
