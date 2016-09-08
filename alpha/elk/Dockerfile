FROM sebp/elk

# TODO: REMOVE?
EXPOSE 5601
EXPOSE 9200
EXPOSE 5044
EXPOSE 5000
EXPOSE 9998
EXPOSE 9999

# Replace existing Beats configuration file.
ADD './01-lumberjack-input.conf' '/etc/logstash/conf.d/01-lumberjack-input.conf'
ADD './02-beats-input.conf' '/etc/logstash/conf.d/02-beats-input.conf'