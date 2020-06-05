import pandas as pd
import itertools

df_data = pd.read_csv('data.csv')

games = df_data['game_id'].unique()
players = df_data['player'].unique()


df = pd.DataFrame(list(itertools.product(games, players)), columns=['game_id', 'player'])
df = df.merge(df_data, on=['game_id', 'player'], how='left')
#
# df = df.fillna(0)
# df[['buy_in', 'amount', 'profit']] = df[['buy_in', 'amount', 'profit']].astype(int)

data_string = df.to_json(orient='records')

file_string = 'var data = ' + data_string + '\n\n'

df_dates = pd.read_csv('dates.csv')
dates_string = df_dates.to_json(orient='records')

file_string += 'var dates = ' + dates_string

with open('/home/chris/Documents/Computing/web_design/poker_website/js/data.js', 'w') as file:
	file.write(file_string)




