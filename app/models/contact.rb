class Contact < ActiveRecord::Base
  attr_accessible :age, :firstname, :lastname

  validates :age, :numericality => { :only_integer => true, :less_than_or_equal_to => 50 }
  validates_presence_of :firstname, :lastname
  validates_uniqueness_of :firstname
end
