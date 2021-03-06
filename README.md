# README

## Membersテーブル

| Column | Type | Options |
|:--|:--|:--|
| user_id | references | null: false, foreign_key: true |
| group_id | references | null: false, foreign_key: true |

### Association
- belongs_to :group
- belongs_to :user


## Usersテーブル

| Column | Type | Options |
|:--|:--|:--|
| name | string | null: false, add_index :users, :name, unique: true |
| mail | string | null: false, add_index :users, :mail, unique: true |
| pass | string | null: false, |

### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members


## Groupsテーブル

| Column | Type | Options |
|:--|:--|:--|
| name | string | null: false, add_index :groups, :group_name, unique: true  |


### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members

## Messagesテーブル

| Column | Type | Options |
|:--|:--|:--|
| text | text |  |
| user_id | references | null: false, foreign_key: true |
| group_id | references | null: false, foreign_key: true |
| image | string | |

### Association
- belongs_to :group
- belongs_to :user
