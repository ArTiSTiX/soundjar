
* User
  - id
  - first_name: String
  - last_name: String
  - fb_id: String
  - email: String
  - status: 'guest', 'invited', 'active'
  - plays(): virtual from TrackRegions
  - lyrics[]: Lyric
  - tracks[]: through TrackRegions
  - track_regions[]: TrackRegions
  - sessions[]: Session

* Sessions
  - id
  - directory: String
  - title: String
  - artist: String
  - cover: String
  - start_at: Date
  - end_at: Date
  - duration(): virtual
  - play_time(): virtual
  - tracks[]: Track

* Tracks
  - id
  - session_id: Session
  - instrumental_id: Instrumental
  - file_id: File
  - title: String
  - users[]: through TrackRegion
  - regions[]: TrackRegion
  - files[]: File
  - start_at: Date
  - duration: Int (seconds)
  - tempo: Float
  - scale: String

* TrackRegion
  - id
  - session_id: Session
  - track_id: Track
  - lyrics_id: Lyric
  - start: Float (seconds)
  - end: Float (seconds)
  - users[]: User

* Participation
  - session_id
  - track_id
  - region_id
  - user_id
  - role

* Lyric
  - user_id: User
  - title: String
  - content: Text

* Instrumental
  - id
  - title: String
  - artist: String
  - source: String
  - url: String (Youtube url)
  - tempo: Float
  - scale: String

* Audio
  - id
  - session_id: Session
  - track_id: Session
  - channel: String
  - source: String (wav file)
  - mp3: String (mp3 conversion)
