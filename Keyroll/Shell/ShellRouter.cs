using System.Collections.Generic;

namespace Keyroll.Shell
{
    public class ShellRouter
    {
        private List<IShellProvider> _Providers
            = new List<IShellProvider>();

        public IEnumerable<IShellProvider> QueryProviders(string mime) 
        {
            foreach (var provider in _Providers)
                if (provider.Support(mime))
                    yield return provider;
        }

        public void AddProvider(IShellProvider provider) 
        {
            if (!_Providers.Contains(provider))
                _Providers.Add(provider);
        }

        public void RemoveProvider(IShellProvider provider) 
        {
            if (_Providers.Contains(provider))
                _Providers.Remove(provider);
        }
    }
}
