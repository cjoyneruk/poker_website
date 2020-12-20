import pandas as pd

start_game = 13
end_game = 28

df = pd.read_csv('data.csv')

df = df[df['game_id'].isin(range(start_game, end_game+1))]

profit = df[['player', 'profit']].groupby('player').sum()
profit = profit*0.05

print(profit)