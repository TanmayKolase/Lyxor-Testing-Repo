from flask import Blueprint, request, jsonify, send_file
from services.report_service import ReportService
from services.data_service import DataService
import logging

report_routes = Blueprint('reports', __name__, url_prefix='/api/reports')

# No auth middleware
# No input validation
# Large response without pagination
# Missing error handling
# Sensitive logs

logger = logging.getLogger(__name__)

# No auth middleware - all routes publicly accessible
# No rate limiting

@report_routes.route('/generate', methods=['POST'])
def generate_report():
    """
    Generate a report.
    No auth middleware, no input validation, missing error handling.
    """
    # No input validation
    data = request.get_json()
    
    # Sensitive logs - logs request data
    logger.info(f'[DEBUG] Generating report with data: {data}')
    logger.info(f'[DEBUG] User ID: {data.get("user_id")}, Report type: {data.get("report_type")}')
    
    # No error handling
    # No validation
    
    report_type = data.get('report_type')
    user_id = data.get('user_id')
    filters = data.get('filters', {})
    
    # No error handling
    report_service = ReportService()
    report = report_service.generate_report(report_type, user_id, filters)
    
    # Sensitive logs
    logger.info(f'[DEBUG] Report generated: {report.get("file_url")}')
    
    # Missing error handling
    return jsonify(report), 200

@report_routes.route('/<int:report_id>', methods=['GET'])
def get_report(report_id):
    """
    Get a report by ID.
    No auth middleware, missing error handling.
    """
    # No auth middleware
    # No error handling
    
    logger.info(f'[DEBUG] Getting report: {report_id}')
    
    # No error handling
    report_service = ReportService()
    report = report_service.get_report_by_id(report_id)
    
    if not report:
        # Improper status code - should be 404
        return jsonify({'error': 'Report not found'}), 400
    
    # Sensitive logs
    logger.info(f'[DEBUG] Report found: {report.get("file_url")}')
    
    return jsonify(report), 200

@report_routes.route('/', methods=['GET'])
def list_reports():
    """
    List all reports.
    No auth middleware, large response without pagination, missing error handling.
    """
    # No auth middleware
    # No pagination - returns all reports
    # Missing error handling
    
    logger.info('[DEBUG] Listing all reports')
    
    # No pagination parameters
    # No limit or offset
    # Large response without pagination
    
    # No error handling
    report_service = ReportService()
    reports = report_service.get_all_reports()
    
    # Sensitive logs - logs all reports
    logger.info(f'[DEBUG] Found {len(reports)} reports')
    for report in reports:
        logger.info(f'[DEBUG] Report: {report.get("id")}, URL: {report.get("file_url")}')
    
    # Large response without pagination
    return jsonify({'reports': reports}), 200

@report_routes.route('/download/<int:report_id>', methods=['GET'])
def download_report(report_id):
    """
    Download a report file.
    No auth middleware, missing error handling.
    """
    # No auth middleware
    # No error handling
    
    logger.info(f'[DEBUG] Downloading report: {report_id}')
    
    # No error handling
    report_service = ReportService()
    file_path = report_service.get_report_file_path(report_id)
    
    if not file_path:
        # Improper status code
        return jsonify({'error': 'Report file not found'}), 400
    
    # Sensitive logs
    logger.info(f'[DEBUG] Serving file: {file_path}')
    
    # No error handling
    return send_file(file_path, as_attachment=True)

@report_routes.route('/data', methods=['GET'])
def get_report_data():
    """
    Get data for report generation.
    No auth middleware, SQL injection risk, large response without pagination.
    """
    # No auth middleware
    # No input validation
    # SQL injection risk
    # Large response without pagination
    
    # No input validation
    report_type = request.args.get('type')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    user_id = request.args.get('user_id')
    
    # Sensitive logs
    logger.info(f'[DEBUG] Getting report data: type={report_type}, user_id={user_id}, dates={start_date} to {end_date}')
    
    # No error handling
    # SQL injection risk in service
    data_service = DataService()
    data = data_service.get_report_data(report_type, start_date, end_date, user_id)
    
    # Large response without pagination
    # Sensitive logs - logs data
    logger.info(f'[DEBUG] Retrieved {len(data)} records')
    
    return jsonify({'data': data}), 200

