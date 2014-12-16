namespace Keyroll
{
    partial class KVMMainUI
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(KVMMainUI));
            this.MainPanel = new System.Windows.Forms.Panel();
            this.toolbar = new System.Windows.Forms.ToolStrip();
            this.TrvKVM = new System.Windows.Forms.TreeView();
            this.BtnRefresh = new System.Windows.Forms.ToolStripButton();
            this.BtnAddItem = new System.Windows.Forms.ToolStripSplitButton();
            this.BtnRemoveItem = new System.Windows.Forms.ToolStripSplitButton();
            this.toolbar.SuspendLayout();
            this.SuspendLayout();
            // 
            // MainPanel
            // 
            this.MainPanel.Dock = System.Windows.Forms.DockStyle.Right;
            this.MainPanel.Location = new System.Drawing.Point(240, 0);
            this.MainPanel.Name = "MainPanel";
            this.MainPanel.Size = new System.Drawing.Size(300, 400);
            this.MainPanel.TabIndex = 8;
            // 
            // toolbar
            // 
            this.toolbar.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.toolbar.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
            this.toolbar.ImageScalingSize = new System.Drawing.Size(24, 24);
            this.toolbar.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BtnAddItem,
            this.BtnRemoveItem,
            this.BtnRefresh});
            this.toolbar.Location = new System.Drawing.Point(0, 369);
            this.toolbar.Name = "toolbar";
            this.toolbar.Size = new System.Drawing.Size(240, 31);
            this.toolbar.TabIndex = 10;
            // 
            // TrvKVM
            // 
            this.TrvKVM.Dock = System.Windows.Forms.DockStyle.Fill;
            this.TrvKVM.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.TrvKVM.FullRowSelect = true;
            this.TrvKVM.Location = new System.Drawing.Point(0, 0);
            this.TrvKVM.Name = "TrvKVM";
            this.TrvKVM.ShowRootLines = false;
            this.TrvKVM.Size = new System.Drawing.Size(240, 369);
            this.TrvKVM.TabIndex = 11;
            this.TrvKVM.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(this.TrvKVM_AfterSelect);
            // 
            // BtnRefresh
            // 
            this.BtnRefresh.Image = ((System.Drawing.Image)(resources.GetObject("BtnRefresh.Image")));
            this.BtnRefresh.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnRefresh.Name = "BtnRefresh";
            this.BtnRefresh.Size = new System.Drawing.Size(80, 28);
            this.BtnRefresh.Text = "Refresh";
            // 
            // BtnAddItem
            // 
            this.BtnAddItem.Image = ((System.Drawing.Image)(resources.GetObject("BtnAddItem.Image")));
            this.BtnAddItem.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnAddItem.Name = "BtnAddItem";
            this.BtnAddItem.Size = new System.Drawing.Size(72, 28);
            this.BtnAddItem.Text = "Add";
            this.BtnAddItem.Click += new System.EventHandler(this.BtnAddItem_Click);
            // 
            // BtnRemoveItem
            // 
            this.BtnRemoveItem.Image = ((System.Drawing.Image)(resources.GetObject("BtnRemoveItem.Image")));
            this.BtnRemoveItem.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnRemoveItem.Name = "BtnRemoveItem";
            this.BtnRemoveItem.Size = new System.Drawing.Size(95, 28);
            this.BtnRemoveItem.Text = "Remove";
            this.BtnRemoveItem.Click += new System.EventHandler(this.BtnRemoveItem_Click);
            // 
            // KVMMainUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.TrvKVM);
            this.Controls.Add(this.toolbar);
            this.Controls.Add(this.MainPanel);
            this.Name = "KVMMainUI";
            this.Size = new System.Drawing.Size(540, 400);
            this.toolbar.ResumeLayout(false);
            this.toolbar.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel MainPanel;
        private System.Windows.Forms.ToolStrip toolbar;
        private System.Windows.Forms.TreeView TrvKVM;
        private System.Windows.Forms.ToolStripButton BtnRefresh;
        private System.Windows.Forms.ToolStripSplitButton BtnAddItem;
        private System.Windows.Forms.ToolStripSplitButton BtnRemoveItem;

    }
}
