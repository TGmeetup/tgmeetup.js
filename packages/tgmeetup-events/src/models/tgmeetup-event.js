export default function TgmeetupEvent(event = {
  name,
  local_date,
  local_time,
  location,
  local_city,
  geocodeFromGroup,
  geocode: { lat, lng },
  link,
) {
  const result = {};
  [ 'name', 'local_date', 'local_time', 'location', 'local_city', 'geocodeFromGroup', 'geocode', 'link' ].forEach(field => {
    if(!event[field]) {
      throw new Error(`${field} cannot be: ${event[field]}`);
    }
    result[field] = event[field];
  });
  return result;
}
export default function TgmeetupEventFromKktix(kktixEvent = {}) {
  return TgmeetupEvent({
    name: kktixEvent.title,
    local_date: kktixEvent.published.split('T')[0],
    local_time: kktixEvent.published.split('T')[1].split('.')[0],
    location: kktixEvent.content.split('：')[2],
    // TODO: GOing
    "local_city": data["city"],
    "geocodeFromGroup": "false",
    "geocode": {
        "lat": g.latitude,
        "lng": g.longitude
    },
    "link": event["url"]
  });
}
