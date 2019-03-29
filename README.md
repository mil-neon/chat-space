# README

## Membersテーブル

| Column | Type | Options |
|:--|:--|:--|
| user_id | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user


## Userテーブル

| Column | Type | Options |
|:--|:--|:--|
| id | integer |主キー|
| name | string | null: false, add_index :users, :name, unique: true |
| mail | string | null: false, add_index :users, :mail, unique: true |

### Association
- has_many :groups, through: :members
- has_many :members


## Groupテーブル

| Column | Type | Options |
|:--|:--|:--|
| id | integer | 主キー |
| group_name | string | null: false, add_index :groups, :group_name, unique: true  |

### Association
- has_many :users, through: :members
- has_many :members

