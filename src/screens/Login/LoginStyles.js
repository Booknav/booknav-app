const { StyleService } = require('@ui-kitten/components');

const LoginStyles = StyleService.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    margin: 16,
    fontWeight: 'bold',
    borderRadius: 12,
  },
  inputIcon: {
    height: 32,
    width: 32,
  },
});

export default LoginStyles;
