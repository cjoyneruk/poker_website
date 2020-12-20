import pandas as pd
import itertools
import json
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, 'js/data')

def create_summary(init_df, games):
	df = init_df[init_df['game_id'].isin(games)].copy()
	df = df.fillna(0).drop(columns='game_id')
	df = df.groupby(by='player').sum().astype(int)
	df['money'] = (df['profit']*0.05).round(2)
	df = df.reset_index()
	df = df[df['buy_in']>0]
	return df.sort_values(by='profit', ascending=False)

# - Get dates
df_dates = pd.read_csv('dates.csv')
dates_data = df_dates.to_dict(orient='records')

with open(os.path.join(OUTPUT_DIR, 'dates.js'), 'w') as dates_file:
	json_string = json.dumps(dates_data, indent=2)
	json_string = 'var dates = ' + json_string
	dates_file.write(json_string)

df_dates = df_dates.set_index('game_id')

df_data = pd.read_csv('data.csv')

games = df_data['game_id'].unique()
players = df_data['player'].unique()


df = pd.DataFrame(list(itertools.product(games, players)), columns=['game_id', 'player'])
df = df.merge(df_data, on=['game_id', 'player'], how='left')
df = df.where(pd.notnull(df), None)
complete_data = df.to_dict(orient='records')

with open(os.path.join(OUTPUT_DIR, 'complete.js'), 'w') as full_data_file:
	json_string = json.dumps(complete_data, indent=2)
	json_string = 'var complete_data = ' + json_string
	full_data_file.write(json_string)

# - Create summary data

games = df['game_id'].unique()
df_total = create_summary(df, games)

summary_data = [{
	'type': 'total',
	'title': 'All games',
	'data': df_total.to_dict(orient='records')
}]

a = (max(games) - 1) // 4 + 1 # no. of phases
b = max(games) % 4 # no. of games

for i in range(0, a):
	print(i)
	df_summary = create_summary(df, range(4*i + 1, (i + 1) * 4+1))
	title = f'Phase {i+1}: Game {i * 4+1} - Game {(i + 1) * 4}'

	summary_data.append({
		'type': 'phase',
		'title': title,
		'data': df_summary.to_dict(orient='records')
	})

with open(os.path.join(OUTPUT_DIR, 'summary.js'), 'w') as summary_data_file:
	json_string = json.dumps(summary_data, indent=2)
	json_string = 'var summary_data = ' + json_string
	summary_data_file.write(json_string)
