Feature: React View Behavior

Scenario: Submit analysis with an existing image and default values
    Given I am on the main page
    When I upload an existing image
    And I click the "Analyze" button
    Then I should see the "Labels" displayed

Scenario: Attempt to submit form without an image
    Given I am on the main page
    When I click the "Analyze" button without selecting an image
    Then I should see an error message "Please select a file"

Scenario: Submit form with changed values for maxLabel and minConfidence
    Given I am on the main page
    When I upload an existing image with maxLabel "5" and minConfidence "80"
    And I click the "Analyze" button
    Then I should see the "Labels" displayed

Scenario: Change application language
    Given I am on the main page
    When I change the language to "French"
    Then I should see the interface in "French"

Scenario: Store language preference in localStorage
    Given I am on the main page
    When I change the language to "French"
    Then the language preference "fr" should be stored in localStorage
