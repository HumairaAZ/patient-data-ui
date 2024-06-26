# Patient Data UI for Jessica Taylor

This project is a comprehensive and dynamic web interface designed to display patient data, with a focus on the patient Jessica Taylor. The interface fetches real-time data from the Coalition Technologies Patient Data API and presents it in a user-friendly format, including detailed patient information, diagnostic history, and lab results.

## Features

- **Responsive Design**: The interface is designed to be fully responsive, ensuring usability across various devices and screen sizes.
- **Real-Time Data Fetching**: Utilizes the Coalition Technologies Patient Data API to fetch the latest patient data.
- **Dynamic Charts**: Displays the patient's blood pressure data for the last 6 months using Chart.js.
- **Interactive UI**: Scrollable diagnostic list and lab results for better user experience.
- **Profile Management**: Includes detailed patient profile with contact information, insurance details, and more.

## Technologies Used

- **HTML5**: For the structure of the web pages.
- **CSS3**: For styling and layout.
- **JavaScript**: For dynamic content and API interactions.
- **Chart.js**: For creating interactive charts.
- **Google Fonts**: For custom fonts.

## Getting Started

### Prerequisites

To run this project locally, you need to have the following installed:

- A modern web browser (e.g., Chrome, Firefox)
- Internet connection to fetch data from the API

### Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/humairaaz/patient-data-ui.git
   cd patient-data-ui
   
2. **Open the Project**
Open the index.html file in your web browser to view the project.


### Usage
Upon opening the index.html file, the web page will fetch and display the latest data for Jessica Taylor from the Coalition Technologies Patient Data API, including:
Personal information and contact details
Diagnostic history and recent blood pressure readings
Lab results with downloadable reports

### Code Overview
index.html: The main HTML file containing the structure of the web page.
style.css: The CSS file containing styles and layout for the web page.
script.js: The JavaScript file responsible for fetching data from the API and dynamically updating the web page content.

### API Integration
The project integrates with the Coalition Technologies Patient Data API to fetch real-time data. The API is accessed using a GET request with basic authentication, and the data is processed and displayed dynamically.

### Customization
To customize the project, you can modify the following files:

index.html: Update the structure and content of the web page.
style.css: Change styles, colors, and layout.
script.js: Modify data fetching, processing, and chart rendering logic.
