Feature:

  Scenario: Try to make a csv
    Given we have a csv with data
      | Surname | NI        | ER Contribution | EE Contribution |
      | Fowler  | JN602899D | 10              | 10              |
      | Harsh   | JE832766A | 20              | 20              |
    And we go to the internet
    When we upload the csv
    Then the filename is displayed